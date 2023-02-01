import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramacionesPageRoutingModule } from './programaciones-routing.module';

import { ProgramacionesPage } from './programaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramacionesPageRoutingModule
  ],
  declarations: [ProgramacionesPage]
})
export class ProgramacionesPageModule {}
