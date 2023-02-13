import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaProgramacionPage } from './lista-programacion.page';

const routes: Routes = [
  {
    path: '',
    component: ListaProgramacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaProgramacionPageRoutingModule {}
