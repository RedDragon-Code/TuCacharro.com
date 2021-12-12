import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerarPedidoComponent } from './generar-pedido/generar-pedido.component';

const routes: Routes = [

  {
    path:"generar-pedido",
    component:GenerarPedidoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
