import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ReservaComponent } from './components/reserva/reserva.component';
import { ReservaRoutingModule } from './reserva-routing.module';
import { ReservaService } from './shared/service/reserva.service';
import { CrearReservaComponent } from './components/crear-reserva/crear-reserva.component';
import { ListarReservaComponent } from './components/listar-reserva/listar-reserva.component';



@NgModule({
  declarations: [
    ReservaComponent,
    CrearReservaComponent,
    ListarReservaComponent
  ],
  imports: [
    ReservaRoutingModule,
    SharedModule
  ],
  providers: [
    ReservaService
  ]
})
export class ReservaModule { }
