import { Injectable } from '@angular/core';
import { Usuario } from '@core/modelo/usuario';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http.service';
import * as moment from 'moment';

type TipoRespuestaEntidad = Usuario;
type TipoRespuestaEntidadArreglo = Usuario[];

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(protected http: HttpService) { }

  public consultarPorNumeroDocumento(numeroDocumento: number) {
    return this.http.doGet<Usuario>(
      `${environment.endpoint}/usuarios/${numeroDocumento}`,
      this.http.optsName('consultar un usuario por su numero de documento')
    ).pipe(map((res: TipoRespuestaEntidad) => this.convertirFechasDesdeServidor(res)));
  }

  protected convertirFechasDesdeCliente(entidad: TipoRespuestaEntidad): TipoRespuestaEntidad {
    const copy: TipoRespuestaEntidad = Object.assign({}, entidad, {
      fechaCreacion:
      entidad.fechaCreacion && entidad.fechaCreacion.isValid() ? entidad.fechaCreacion.toJSON() : undefined
    });
    return copy;
  }

  protected convertirFechasDesdeServidor(entidad: TipoRespuestaEntidad): TipoRespuestaEntidad {
    if (entidad) {
      entidad.fechaCreacion = entidad.fechaCreacion ? moment(entidad.fechaCreacion) : undefined;
    }
    return entidad;
  }

  protected convertirArreglosFechasDesdeServidor(entidades: TipoRespuestaEntidadArreglo): TipoRespuestaEntidadArreglo {
    if (entidades) {
      entidades.forEach((entidad: TipoRespuestaEntidad) => {
        entidad.fechaCreacion = entidad.fechaCreacion ? moment(entidad.fechaCreacion) : undefined;
      });
    }
    return entidades;
  }

}
