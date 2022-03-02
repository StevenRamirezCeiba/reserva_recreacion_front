import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mensaje-exito',
  templateUrl: './mensaje-exito.component.html',
  styleUrls: ['./mensaje-exito.component.css']
})
export class MensajeExitoComponent implements OnInit {

  @Input() mensajeExito: string;
  @Output() emitirMostrar: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  cerrarComponente(): void {
    this.emitirMostrar.emit(false);
  }

}

