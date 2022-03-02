import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Reserva } from '@reserva/shared/model/reserva';
import { ReservaService } from '@reserva/shared/service/reserva.service';

@Component({
  selector: 'app-listar-reserva',
  templateUrl: './listar-reserva.component.html',
  styleUrls: ['./listar-reserva.component.css']
})
export class ListarReservaComponent implements OnInit {

  numeroDocumento: number;
  reservas: Reserva[];

  // Mensajes
  mensajeError: string;
  mostrarError: boolean;
  mensajeExito: string;
  mostrarExito: boolean;

  constructor(protected reservaService: ReservaService) {
    this.mostrarError = false;
    this.mostrarExito = false;
  }

  ngOnInit(): void {
  }

  listarReservasPorUsuarioNumeroDocumento(): void {
    this.reservaService.listarReservasPorUsuarioNumeroDocumento(this.numeroDocumento).subscribe(
      res => {
        this.reservas = res;
      },
      error => {
        this.procesarError(error);
        this.reservas = null;
      }
    );
  }

  cancelarReserva(reserva: Reserva): void {
    const reservaPeticion = Object.assign({}, reserva);
    reservaPeticion.reservaEstadoId = 2;
    this.reservaService.actualizar(reservaPeticion).subscribe(
      () => {
        this.mensajeExito = 'Reserva cancelada con éxito!';
        this.mostrarExito = true;
        this.listarReservasPorUsuarioNumeroDocumento();
      },
      error => this.procesarError(error)
    );
  }

  procesarError(error: HttpErrorResponse): void {
    this.mensajeError = error.error.mensaje;
    this.mostrarError = true;
  }

}
