import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Reserva } from '@reserva/shared/model/reserva';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { ListarReservaComponent } from './listar-reserva.component';
import * as moment from 'moment';
import { of } from 'rxjs';
import { HttpService } from '@core/services/http.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('ListarReservaComponent', () => {
  let component: ListarReservaComponent;
  let fixture: ComponentFixture<ListarReservaComponent>;
  let reservaService: ReservaService;
  const reservaLista: Reserva[] = [
    new Reserva(1, 30000, moment().startOf('days'), moment().startOf('days').add(3, 'days'), 1, 1, 'CONFIRMADA')];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarReservaComponent],
      imports: [CommonModule, HttpClientModule, RouterTestingModule, FormsModule],
      providers: [ReservaService, HttpService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarReservaComponent);
    component = fixture.componentInstance;
    reservaService = TestBed.inject(ReservaService);
    spyOn(reservaService, 'listarReservasPorUsuarioNumeroDocumento').and.returnValue(
      of(reservaLista)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
