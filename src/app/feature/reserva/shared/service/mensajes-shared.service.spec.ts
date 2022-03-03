import { TestBed } from '@angular/core/testing';

import { MensajesSharedService } from './mensajes-shared.service';

describe('MensajesSharedService', () => {
  let service: MensajesSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MensajesSharedService]
    });
    service = TestBed.inject(MensajesSharedService);
  });

  it('should be created', () => {
    const mensajesSharedService: MensajesSharedService = TestBed.inject(MensajesSharedService);
    expect(mensajesSharedService).toBeTruthy();
  });

  it('Deberia emitir mensaje de error', () => {
    const mensajeError = 'Mensaje de error';

    service.emitirMensajeError(mensajeError);
    service.mensajeError$.subscribe(mensaje => {
      expect(mensaje).toBe(mensajeError);
    });
  });

  it('Deberia emitir mostrar error', () => {
    const mostrarError = true;

    service.emitirMostrarError(mostrarError);
    service.mostrarError$.subscribe(mostrar => {
      expect(mostrar).toBe(mostrarError);
    });
  });

  it('Deberia emitir mensaje de exito', () => {
    const mensajeExito = 'Mensaje de exito';

    service.emitirMensajeExito(mensajeExito);
    service.mensajeExito$.subscribe(mensaje => {
      expect(mensaje).toBe(mensajeExito);
    });
  });

  it('Deberia emitir mostrar exito', () => {
    const mostrarExito = true;

    service.emitirMostrarExito(mostrarExito);
    service.mostrarExito$.subscribe(mostrar => {
      expect(mostrar).toBe(mostrarExito);
    });
  });
});
