import { Injectable } from '@angular/core';
import { Usuario } from '@core/modelo/usuario';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http.service';
import * as moment from 'moment';

type TipoRespuestaEntidad = Usuario;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiEndpointUsuarios = `${environment.endpoint}/usuarios`;

  constructor(protected http: HttpService) { }

  public consultarPorNumeroDocumento(numeroDocumento: number) {
    return this.http.doGet<Usuario>(
      `${this.apiEndpointUsuarios}/${numeroDocumento}`,
      this.http.optsName('consultar un usuario por su numero de documento')
    ).pipe(map((res: TipoRespuestaEntidad) => this.convertirFechasDesdeServidor(res)));
  }

  private convertirFechasDesdeServidor(entidad: TipoRespuestaEntidad): TipoRespuestaEntidad {
    if (entidad) {
      entidad.fechaCreacion = entidad.fechaCreacion ? moment(entidad.fechaCreacion) : undefined;
    }
    return entidad;
  }

}
