import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleProgramacionPage } from './detalle-programacion.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleProgramacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleProgramacionPageRoutingModule {}
