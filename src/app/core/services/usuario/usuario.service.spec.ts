import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Usuario } from '@core/modelo/usuario';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http.service';
import { UsuarioService } from './usuario.service';
import * as moment from 'moment';

describe('UsuarioService', () => {
  let httpMock: HttpTestingController;
  let service: UsuarioService;
  const apiEndpointUsuarios = `${environment.endpoint}/usuarios`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuarioService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(UsuarioService);
  });

  it('should be created', () => {
    const usuarioService: UsuarioService = TestBed.inject(UsuarioService);
    expect(usuarioService).toBeTruthy();
  });

  it('deberia consultar un usuario por numero de documento', () => {
    const numeroDocumento = 1075318997;
    const dummyUsuario = new Usuario(1, 'CHRISTIAN', 'STEVEN', 1075318997, 0, 1, 'BRONCE', moment().startOf('days'));
    service.consultarPorNumeroDocumento(numeroDocumento).subscribe(usuario => {
      expect(usuario).toBeDefined();
      expect(usuario).toEqual(dummyUsuario);
    });
    const req = httpMock.expectOne(`${apiEndpointUsuarios}/${numeroDocumento}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsuario);
  });
});
