import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Reserva } from '@reserva/shared/model/reserva';
import { MensajesSharedService } from '@reserva/shared/service/mensajes-shared.service';
import { ReservaService } from '@reserva/shared/service/reserva.service';

@Component({
  selector: 'app-listar-reserva',
  templateUrl: './listar-reserva.component.html',
  styleUrls: ['./listar-reserva.component.css']
})
export class ListarReservaComponent implements OnInit {

  numeroDocumento: number;
  reservas: Reserva[];

  constructor(protected reservaService: ReservaService,
              private mensajesSharedService: MensajesSharedService) {
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
        this.mensajesSharedService.emitirMensajeExito('Reserva cancelada con éxito!');
        this.mensajesSharedService.emitirMostrarExito(true);
        this.listarReservasPorUsuarioNumeroDocumento();
      },
      error => this.procesarError(error)
    );
  }

  procesarError(error: HttpErrorResponse): void {
    this.mensajesSharedService.emitirMensajeError(error.error.mensaje);
    this.mensajesSharedService.emitirMostrarError(true);
  }

}
