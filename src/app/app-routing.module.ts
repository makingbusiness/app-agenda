import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'lista',
    loadChildren: () => import('./paginas/lista/lista.module').then( m => m.ListaPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./paginas/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'programacion',
    loadChildren: () => import('./paginas/programacion/programacion.module').then( m => m.ProgramacionPageModule)
  },
  {
    path: 'actualizar',
    loadChildren: () => import('./paginas/actualizar/actualizar.module').then( m => m.ActualizarPageModule)
  },
  {
    path: 'filtro',
    loadChildren: () => import('./paginas/filtro/filtro.module').then( m => m.FiltroPageModule)
  },
  {
    path: 'opciones',
    loadChildren: () => import('./paginas/opciones/opciones.module').then( m => m.OpcionesPageModule)
  },
  {
    path: 'notas',
    loadChildren: () => import('./paginas/notas/notas.module').then( m => m.NotasPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./paginas/productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'detalle-programacion',
    loadChildren: () => import('./paginas/detalle-programacion/detalle-programacion.module').then( m => m.DetalleProgramacionPageModule)
  },
  {
    path: 'programaciones',
    loadChildren: () => import('./paginas/programaciones/programaciones.module').then( m => m.ProgramacionesPageModule)
  },
  {
    path: 'lista-programacion',
    loadChildren: () => import('./paginas/lista-programacion/lista-programacion.module').then( m => m.ListaProgramacionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
