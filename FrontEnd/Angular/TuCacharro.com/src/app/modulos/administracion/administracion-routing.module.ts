import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarPersonaComponent } from './personas/buscar-persona/buscar-persona.component';
import { CrearPersonaComponent } from './personas/crear-persona/crear-persona.component';
import { EditarPersonaComponent } from './personas/editar-persona/editar-persona.component';
import { EliminarPersonaComponent } from './personas/eliminar-persona/eliminar-persona.component';
import { BuscarProductoComponent } from './producto/buscar-producto/buscar-producto.component';
import { CrearProductoComponent } from './producto/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './producto/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './producto/eliminar-producto/eliminar-producto.component';

const routes: Routes = [
  {
    path:"personas/crear-persona",
    component:CrearPersonaComponent
  },
  {
    path:"personas/editar-persona",
    component:EditarPersonaComponent
  },
  {
    path:"personas/buscar-persona",
    component:BuscarPersonaComponent
  },
  {
    path:"personas/eliminar-persona",
    component:EliminarPersonaComponent
  },
  {
    path:"producto/crear-producto",
    component:CrearProductoComponent
  },
  {
    path:"producto/editar-producto",
    component:EditarProductoComponent
  },
  {
    path:"producto/buscar-producto",
    component:BuscarProductoComponent
  },
  {
    path:"producto/eliminar-producto",
    component:EliminarProductoComponent
  }
  



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
