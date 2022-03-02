import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Reserva } from '../model/reserva';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { DATE_TIME_FORMAT } from '@core/constantes/fechas-constantes';

type TipoRespuestaEntidad = Reserva;
type TipoRespuestaEntidadArreglo = Reserva[];

@Injectable()
export class ReservaService {
  constructor(protected http: HttpService) { }

  public listarReservasPorUsuarioNumeroDocumento(numeroDocumento: number) {
    return this.http.doGet<Reserva[]>(
      `${environment.endpoint}/reservas/${numeroDocumento}`,
      this.http.optsName('listar reservas por usuario numero documento')
    ).pipe(map((res: TipoRespuestaEntidadArreglo) => this.convertirArreglosFechasDesdeServidor(res)));
  }

  public guardar(reserva: Reserva) {
    const copy = this.convertirFechasDesdeCliente(reserva);
    return this.http.doPost<Reserva, number>(
      `${environment.endpoint}/reservas`,
      copy,
      this.http.optsName('crear reservas')
    );
  }

  public actualizar(reserva: Reserva) {
    const copy = this.convertirFechasDesdeCliente(reserva);
    return this.http.doPut<Reserva>(
      `${environment.endpoint}/reservas`,
      copy,
      this.http.optsName('actualizar reservas')
    );
  }

  // public eliminar(producto: Producto) {
  //   return this.http.doDelete<boolean>(
  //     `${environment.endpoint}/productos/${producto.id}`,
  //     this.http.optsName("eliminar productos")
  //   );
  // }

  protected convertirFechasDesdeCliente(entidad: TipoRespuestaEntidad): TipoRespuestaEntidad {
    const copy: TipoRespuestaEntidad = Object.assign({}, entidad, {
      fechaCreacion: entidad.fechaCreacion && entidad.fechaCreacion.isValid() ? entidad.fechaCreacion.format(DATE_TIME_FORMAT) : undefined,
      fechaReserva: entidad.fechaReserva && entidad.fechaReserva.isValid() ? entidad.fechaReserva.format(DATE_TIME_FORMAT) : undefined
    });
    return copy;
  }

  protected convertirFechasDesdeServidor(entidad: TipoRespuestaEntidad): TipoRespuestaEntidad {
    if (entidad) {
      entidad.fechaCreacion = entidad.fechaCreacion ? moment(entidad.fechaCreacion) : undefined;
      entidad.fechaReserva = entidad.fechaReserva ? moment(entidad.fechaReserva) : undefined;
    }
    return entidad;
  }

  protected convertirArreglosFechasDesdeServidor(entidades: TipoRespuestaEntidadArreglo): TipoRespuestaEntidadArreglo {
    if (entidades) {
      entidades.forEach((entidad: TipoRespuestaEntidad) => {
        entidad.fechaCreacion = entidad.fechaCreacion ? moment(entidad.fechaCreacion) : undefined;
        entidad.fechaReserva = entidad.fechaReserva ? moment(entidad.fechaReserva) : undefined;
      });
    }
    return entidades;
  }
}
