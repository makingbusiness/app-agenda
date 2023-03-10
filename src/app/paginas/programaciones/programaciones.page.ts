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
      this.programaciones = []

      if (!this.agenda.esPotencial)
      {
          this.agenda.programacion_cliente(this.agenda.cliente.codclie)
              .then((p:any) => this.programaciones = p)
      }
      else
      { 
            console.log("Evento ionic: " + this.agenda.potencial.tipo)
      }
  }
  
  ngOnInit() 
  {
      this.programaciones_todo = []

      if (!this.agenda.esPotencial)
      {
          this.agenda.programacion_cliente_todo(this.agenda.cliente.codclie)
          .then((p:any) => this.programaciones_todo = p)
      }
      else
      {
            console.log('Init ', this.agenda.potencial.tipo)
      }
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
