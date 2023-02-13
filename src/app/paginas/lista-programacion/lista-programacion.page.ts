import { Component, OnInit } from '@angular/core';
import { Programacion } from '../../modelo/Programacion';
import moment from 'moment'

@Component({
  selector: 'app-lista-programacion',
  templateUrl: './lista-programacion.page.html',
  styleUrls: ['./lista-programacion.page.scss'],
})
export class ListaProgramacionPage implements OnInit {

  lista:Programacion[] = []
  desde:string = moment().format('YYYY-MM-DD')
  hasta:string = moment().format('YYYY-MM-DD')

  constructor() { }

  ngOnInit() {
  }

  buscar()
  {
      console.log('Programaciones desde ', this.desde,' hasta ', this.hasta)
  }

}
