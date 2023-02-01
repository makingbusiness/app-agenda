import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../../servicios/agenda.service';
import { Programacion } from '../../modelo/Programacion';

@Component({
  selector: 'app-programaciones',
  templateUrl: './programaciones.page.html',
  styleUrls: ['./programaciones.page.scss'],
})
export class ProgramacionesPage implements OnInit {

  programaciones:Programacion[] = []
  programaciones_todo:Programacion[] = []

  esPropia:boolean = true
  esOtros:boolean = false

  constructor(private agenda:AgendaService) { }

  ionViewDidEnter()
  {
      this.agenda.programacion_cliente(this.agenda.cliente.codclie)
          .then((p:any) => this.programaciones = p)
  }
  
  ngOnInit() 
  {

          this.agenda.programacion_cliente_todo(this.agenda.cliente.codclie)
          .then((p:any) => this.programaciones_todo = p)
  }

  mostrarPropias()
  {
      this.esPropia = true
      this.esOtros = false
  }

  mostrarOtras()
  {
      this.esOtros = true
      this.esPropia = false
  }
}
