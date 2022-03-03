import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Usuario } from '@core/modelo/usuario';
import { HttpService } from '@core/services/http.service';
import { UsuarioService } from '@core/services/usuario/usuario.service';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { of } from 'rxjs';
import * as moment from 'moment';

import { CrearReservaComponent } from './crear-reserva.component';

describe('CrearReservaComponent', () => {
  let component: CrearReservaComponent;
  let fixture: ComponentFixture<CrearReservaComponent>;
  let reservaService: ReservaService;
  let usuarioService: UsuarioService;
  let usuario: Usuario;
  let fechaActual: moment.Moment;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearReservaComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [ReservaService, UsuarioService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fechaActual = moment().startOf('seconds');
    usuario = new Usuario(1, 'CHRISTIAN', 'STEVEN', 1075318997, 0, 1, 'BRONCE', moment().startOf('days'));
    fixture = TestBed.createComponent(CrearReservaComponent);
    component = fixture.componentInstance;
    reservaService = TestBed.inject(ReservaService);
    usuarioService = TestBed.inject(UsuarioService);
    spyOn(reservaService, 'guardar').and.returnValue(of(1));
    spyOn(usuarioService, 'consultarPorNumeroDocumento').and.returnValue(of(usuario));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.reservaForm.valid).toBeFalsy();
  });

  it('Consultar usuario por numero documento', () => {
    expect(component.reservaForm.controls.usuario.valid).toBeFalsy();
    component.numeroDocumento = 1075318997;
    component.consultarUsuarioPorNumeroDocumento();
    expect(component.reservaForm.controls.usuario.value).toBe(usuario);
  });

  it('Creando entidad a guardar', () => {
    const fechaReserva = component.combinarFechaHora(fechaActual.add(3, 'days').format('yyyy-MM-dd'),
        fechaActual.format('HH:mm')).toString();
    expect(component.reservaForm.valid).toBeFalsy();
    component.reservaForm.controls.fechaReserva.setValue(fechaActual.add(3, 'days').format('yyyy-MM-dd'));
    component.reservaForm.controls.horaReserva.setValue(fechaActual.format('HH:mm'));
    component.reservaForm.controls.usuario.setValue(usuario);
    expect(component.reservaForm.valid).toBeTruthy();
    const entidad = component.crearEntidad();
    expect(entidad.usuarioId).toEqual(1);
    expect(entidad.fechaReserva.toString()).toBe(fechaReserva);
    expect(entidad.reservaEstadoId).toEqual(1);
  });

  it('Creando reserva', () => {
    expect(component.reservaForm.valid).toBeFalsy();
    component.reservaForm.controls.fechaReserva.setValue(fechaActual.add(3, 'days').format('yyyy-MM-dd'));
    component.reservaForm.controls.horaReserva.setValue(fechaActual.format('HH:mm'));
    component.reservaForm.controls.usuario.setValue(usuario);
    expect(component.reservaForm.valid).toBeTruthy();

    component.crear();
    expect(component.reservaForm.valid).toBeFalsy();
    expect(component.reservaForm.controls.usuario.value).toBe(usuario);
  });
});
