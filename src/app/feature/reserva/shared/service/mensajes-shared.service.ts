
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MensajesSharedService {
  // Observable string sources
  private emitirCambioMensajeError = new Subject<string>();
  private emitirCambioMostrarError = new Subject<boolean>();
  private emitirCambioMensajeExito = new Subject<string>();
  private emitirCambioMostrarExito = new Subject<boolean>();
  // Observable string streams
  mensajeError$ = this.emitirCambioMensajeError.asObservable();
  mostrarError$ = this.emitirCambioMostrarError.asObservable();
  mensajeExito$ = this.emitirCambioMensajeExito.asObservable();
  mostrarExito$ = this.emitirCambioMostrarExito.asObservable();
  // Service message commands
  emitirMensajeError(mensaje: string) {
    this.emitirCambioMensajeError.next(mensaje);
  }

  emitirMostrarError(mostrar: boolean) {
    this.emitirCambioMostrarError.next(mostrar);
  }

  emitirMensajeExito(mensaje: string) {
    this.emitirCambioMensajeExito.next(mensaje);
  }

  emitirMostrarExito(mostrar: boolean) {
    this.emitirCambioMostrarExito.next(mostrar);
  }

  emitirValoresIniciales() {
    this.emitirCambioMensajeError.next(null);
    this.emitirCambioMostrarError.next(null);
    this.emitirCambioMensajeExito.next(null);
    this.emitirCambioMostrarExito.next(null);
  }
}
