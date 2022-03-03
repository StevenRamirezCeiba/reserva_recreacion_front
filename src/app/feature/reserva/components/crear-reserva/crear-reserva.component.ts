import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { UsuarioService } from '@core/services/usuario/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { Reserva } from '@reserva/shared/model/reserva';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent implements OnInit {
  reservaForm: FormGroup;
  numeroDocumento: number;
  hoy = moment().add(1, 'days').toString();

  // Mensajes
  mensajeError: string;
  mostrarError: boolean;
  mensajeExito: string;
  mostrarExito: boolean;

  constructor(protected reservaService: ReservaService,
              protected usuarioService: UsuarioService) {
    this.mostrarError = false;
    this.mostrarExito = false;
  }

  ngOnInit() {
    this.construirFormularioProducto();
  }

  crear(): void {
    const reserva = this.crearEntidad();
    console.warn(reserva);
    this.reservaService.guardar(reserva).subscribe(
      () => {
        this.mensajeExito = 'Reserva creada con éxito!';
        this.mostrarExito = true;
        this.reservaForm.reset();
        this.consultarUsuarioPorNumeroDocumento();
      },
      error => this.procesarError(error)
    );
  }

  private construirFormularioProducto() {
    this.reservaForm = new FormGroup({
      fechaReserva: new FormControl('', [Validators.required]),
      horaReserva: new FormControl('', [Validators.required]),
      usuario: new FormControl('', [Validators.required])
    });
  }

  consultarUsuarioPorNumeroDocumento(): void {
    this.usuarioService.consultarPorNumeroDocumento(this.numeroDocumento).subscribe(
      res => {
        this.reservaForm.patchValue({ usuario: res });
      },
      error => {
        this.procesarError(error);
        this.reservaForm.reset();
      });
  }

  private crearEntidad(): Reserva {
    return {
      ...new Reserva(),
      usuarioId: this.reservaForm.get(['usuario'])?.value.id,
      fechaReserva: this.reservaForm.get(['fechaReserva'])?.value && this.reservaForm.get(['horaReserva'])?.value
        ? this.combinarFechaHora(this.reservaForm.get(['fechaReserva'])?.value, this.reservaForm.get(['horaReserva'])?.value)
        : undefined,
      reservaEstadoId: 1
    };
  }

  procesarError(error: HttpErrorResponse): void {
    this.mensajeError = error.error.mensaje;
    this.mostrarError = true;
  }

  combinarFechaHora(fecha: string, hora: string): moment.Moment {
    return moment(fecha + ' ' + hora);
  }

}
