import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleProgramacionPageRoutingModule } from './detalle-programacion-routing.module';

import { DetalleProgramacionPage } from './detalle-programacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleProgramacionPageRoutingModule
  ],
  declarations: [DetalleProgramacionPage]
})
export class DetalleProgramacionPageModule {}
