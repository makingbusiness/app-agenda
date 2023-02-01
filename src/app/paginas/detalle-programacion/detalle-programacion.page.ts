import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../modelo/Cliente';
import { Router } from '@angular/router';
import { AgendaService } from '../../servicios/agenda.service';
import { Programacion } from '../../modelo/Programacion';
import { IonDatetime, ModalController } from '@ionic/angular';
import { ActualizarService } from '../../servicios/actualizar.service';

@Component({
  selector: 'app-detalle-programacion',
  templateUrl: './detalle-programacion.page.html',
  styleUrls: ['./detalle-programacion.page.scss'],
})
export class DetalleProgramacionPage implements OnInit {

  visita:boolean = true
  llamada:boolean = false

  motivo:string

  cliente:Cliente

  noCompra:string[] = []

  programaciones:Programacion[] = []

  programacion:Programacion = {
    CodClie: '',
    Nombre: '',
    Enviado: false,
    EsVisita: false,
    FechaProg: '2023-01-14',
    FechaVisita: '2023-01-14',
    HoraProgramacion: '',
    HoraVisita: '',
    NoCompra: 'NO TIENE DINERO',
    Vendedor: '',
    Observaciones: ''
  }
  
  constructor(private ruta:Router, 
              private agenda:AgendaService,
              private sc:ActualizarService,
              private modal:ModalController) 
  { 
    console.log(this.programacion) 
  }

  ngOnInit() 
  {
      console.log('Hola, tamos programando!!')
      this.cliente = this.agenda.cliente
      this.noCompra = this.agenda.noCompra

      this.programacion.CodClie = this.cliente.codclie
      this.programacion.Nombre = this.cliente.descrip
      this.programacion.Vendedor = '001'      

      this.agenda.lista_programaciones()
          .then((p:any) => {
              this.programaciones = p

              console.log('Programaciones guardadas: ', this.programaciones)
          })
  }

  visitar()
  {
      console.log('Tamos de visita')
  }

  llamar()
  {
      console.log('A llamar se dijo!!')
  }

  guardar()
  {
      this.programaciones = [ ...this.programaciones, this.programacion]

      console.log('Guardando ', this.programaciones)

      this.sc.actualizar_programacion(this.programaciones)
          .then((r:any) => {
              console.log('Resultado: ', r)
          })

      //this.ruta.navigateByUrl('opciones')
  }

  regresar()
  {
      console.log('Nos vidrios!')
  }

  cerrar()
  {
      this.modal.dismiss()
  }
}
