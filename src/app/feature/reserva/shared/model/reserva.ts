
import { Moment } from 'moment';

export class Reserva {
  id: number;
  valor: number;
  fechaCreacion: Moment;
  fechaReserva: Moment;
  usuarioId: number;
  reservaEstadoId: number;
  reservaEstadoNombre: string;

  constructor(
    id?: number,
    valor?: number,
    fechaCreacion?: Moment,
    fechaReserva?: Moment,
    usuarioId?: number,
    reservaEstadoId?: number,
    reservaEstadoNombre?: string
  ) {
    this.id = id;
    this.valor = valor;
    this.fechaCreacion = fechaCreacion;
    this.fechaReserva = fechaReserva;
    this.usuarioId = usuarioId;
    this.reservaEstadoId = reservaEstadoId;
    this.reservaEstadoNombre = reservaEstadoNombre;
  }
}
