import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../../servicios/agenda.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'
import moment from 'moment'
import { Cliente, Potencial } from '../../modelo/Cliente';
import { Programacion } from '../../modelo/Programacion';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  clientes:Cliente[] = []
  potenciales:Potencial[] = []
  esPotencial:boolean = false
  esOtros:boolean = false
  todo:boolean = false
  fechaProgramacion: string = moment().format('YYYY-MM-DD')


  constructor(private sc:AgendaService, private ruta:Router,private toast:ToastController) { }

  ngOnInit() 
  {
    console.log('Cargando lista de clientes...')
    this.cargar_lista()
  }

  cargar_lista()
  {     
      if (this.sc.filtro.Potenciales || this.sc.filtro.OtrosPotenciales)
      {
        this.esPotencial = true
        this.potenciales = []

        this.sc.lista_potenciales()
          .then((c:any) => {
            this.potenciales = c

            this.esOtros =  this.potenciales.filter(p => p.tipo !== 'Otros').length === 0
          })
      }
      else
      {       
          this.esPotencial = false
          this.clientes = []
          this.sc.lista_clientes()
            .then((c:any) => {
                this.clientes = c
          })
      }
  }

  verDetalle(cliente:Cliente)
  {      
      this.sc.cliente = cliente
      this.sc.esPotencial = false
      this.ruta.navigateByUrl(`opciones`)
  }

  verPotencial(cliente:Potencial)
  {      
      this.sc.esPotencial = true
      this.sc.potencial = cliente
      this.ruta.navigateByUrl(`opciones`)
  }

  irInicio()
  {
      this.ruta.navigateByUrl("/")
  }

  filtrar()
  {
      this.ruta.navigateByUrl("/filtro")
  }

  seleccionar_todo()
  {
      if (this.sc.esPotencial)
      {
          this.potenciales.map(m => m.seleccionado = this.todo)
      }
      else
      {
          this.clientes.map(m => m.seleccionado = this.todo)
      }
  }

  async generar()
  { 
      let lista:Programacion[] = []

      if (!this.sc.esPotencial)
      {
          this.clientes.forEach(c => {
              if (c.seleccionado)
              {
                  lista.push({
                      CodClie: c.codclie,
                      Enviado: false,
                      EsVisita: false,
                      FechaProg: this.fechaProgramacion,
                      FechaVisita:'',
                      HoraVisita: '',
                      NoCompra: '',
                      Nombre: c.descrip,
                      Observaciones: '',
                      Vendedor: '001'
                  })
                }
                
              })      
              
              this.clientes.map(m => m.seleccionado = false)
        }
        else
        {
          this.potenciales.forEach(c => {
            if (c.seleccionado)
            {
              lista.push({
                CodClie: c.codclie,
                Enviado: false,
                EsVisita: false,
                FechaProg: this.fechaProgramacion,
                FechaVisita:'',
                HoraVisita: '',
                NoCompra: '',
                Nombre: c.descrip,
                Observaciones: '',
                Vendedor: '001'
              })

            }
          })

          this.potenciales.map(m => m.seleccionado = false)
        }
        
        if (lista.length > 0)
        {
          
          const mensaje = await this.toast.create({
            message: `Se crearon ${ lista.length } programaciones`,
            duration: 800,
            position: 'middle'
          })
          
          console.log('Programados: ', lista)
          lista = []
          await mensaje.present()
        }
  }
}
