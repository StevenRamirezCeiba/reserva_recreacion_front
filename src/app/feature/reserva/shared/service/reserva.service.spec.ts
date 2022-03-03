import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Reserva } from '../model/reserva';
import { ReservaService } from './reserva.service';
import * as moment from 'moment';

describe('ReservaService', () => {
  let httpMock: HttpTestingController;
  let service: ReservaService;
  const apiEndpointReservas = `${environment.endpoint}/reservas`;
  const fechaActual = moment().startOf('seconds');

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ReservaService);
  });

  it('should be created', () => {
    const reservaService: ReservaService = TestBed.inject(ReservaService);
    expect(reservaService).toBeTruthy();
  });

  it('deberia listar reservas por su numero documento del usuario', () => {
    const numeroDocumento = 1075318997;
    const dummyReservas = [
      new Reserva(1, 30000, fechaActual, fechaActual.add(3, 'days'), 1, 1, 'CONFIRMADA'),
      new Reserva(2, 30000, fechaActual, fechaActual.add(4, 'days'), 1, 1, 'CONFIRMADA')
    ];

    service.listarReservasPorUsuarioNumeroDocumento(numeroDocumento).subscribe(reservas => {
      expect(reservas.length).toBe(2);
      expect(reservas).toEqual(dummyReservas);
    });
    const req = httpMock.expectOne(`${apiEndpointReservas}/${numeroDocumento}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyReservas);
  });

  it('deberia crear una reserva', () => {
    const reserva = {...new Reserva(),
      fechaReserva: fechaActual.add(3, 'days'),
      usuarioId: 1,
      reservaEstadoId: 1
    };
    const dummyIdReserva = 1;

    service.guardar(reserva).subscribe(idReserva => {
      expect(idReserva).toBe(1);
    });
    const req = httpMock.expectOne(apiEndpointReservas);
    expect(req.request.method).toBe('POST');
    req.flush(dummyIdReserva);
  });

  it('deberia actualizar una reserva', () => {
    const reserva = new Reserva(1, 30000, fechaActual, fechaActual.add(3, 'days'), 1, 1, 'CONFIRMADA');

    service.actualizar(reserva).subscribe();
    const req = httpMock.expectOne(apiEndpointReservas);
    expect(req.request.method).toBe('PUT');
  });
});
