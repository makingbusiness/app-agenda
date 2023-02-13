import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaProgramacionPageRoutingModule } from './lista-programacion-routing.module';

import { ListaProgramacionPage } from './lista-programacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaProgramacionPageRoutingModule
  ],
  declarations: [ListaProgramacionPage]
})
export class ListaProgramacionPageModule {}
