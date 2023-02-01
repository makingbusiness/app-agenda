import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpcionesPage } from './opciones.page';

const routes: Routes = [
  {
      path: '',
      redirectTo: '/opciones/info',
      pathMatch: 'full'
  },
  {
    path: '',
    component: OpcionesPage,
    children: [
      {
          path: 'info',
          loadChildren: () => import('../cliente/cliente.module').then( m => m.ClientePageModule)
      },
      {
          path: 'notas',
          loadChildren: () => import('../notas/notas.module').then( m => m.NotasPageModule)
      },
      {
          path: 'programaciones',
          loadChildren: () => import('../programaciones/programaciones.module').then( m => m.ProgramacionesPageModule)
      },
      {
          path: 'productos',
          loadChildren: () => import('../productos/productos.module').then( m => m.ProductosPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpcionesPageRoutingModule {}
