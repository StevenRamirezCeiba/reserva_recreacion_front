import { Moment } from 'moment';

export class Usuario {
  id: number;
  nombre: string;
  apellido: string;
  numeroDocumento: number;
  reservasAcumulado: number;
  categoriaId: number;
  categoriaNombre: string;
  fechaCreacion: Moment;

  constructor(
    id: number,
    nombre: string,
    apellido: string,
    numeroDocumento: number,
    reservasAcumulado: number,
    categoriaId: number,
    categoriaNombre: string,
    fechaCreacion: Moment
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.numeroDocumento = numeroDocumento;
    this.reservasAcumulado = reservasAcumulado;
    this.categoriaId = categoriaId;
    this.categoriaNombre = categoriaNombre;
    this.fechaCreacion = fechaCreacion;
  }
}
