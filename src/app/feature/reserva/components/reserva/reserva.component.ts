import { Component, OnInit } from '@angular/core';
import { MensajesSharedService } from '@reserva/shared/service/mensajes-shared.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  mensajeError: string;
  mostrarError: boolean;
  mensajeExito: string;
  mostrarExito: boolean;

  constructor(private mensajeSharedService: MensajesSharedService) {
    this.mensajeSharedService.mensajeError$.subscribe(mensajeError => this.mensajeError = mensajeError);
    this.mensajeSharedService.mostrarError$.subscribe(mostrarError => this.mostrarError = mostrarError);
    this.mensajeSharedService.mensajeExito$.subscribe(mensajeExito => this.mensajeExito = mensajeExito);
    this.mensajeSharedService.mostrarExito$.subscribe(mostrarExito => this.mostrarExito = mostrarExito);
  }
  ngOnInit(): void {}

}
