import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../../servicios/agenda.service';
import { Cliente, Potencial } from '../../modelo/Cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  todos:Cliente[] = []
  clientes:Cliente[] = []
  potenciales:Potencial[] = []
  esPotencial:boolean = false

  pos:number = 0

  constructor(private sc:AgendaService, private ruta:Router) { }

  ngOnInit() 
  {
    console.log('Cargando lista de clientes...')
    this.listar()
  }

  cargar_lista(event?)
  {     
      let existe:boolean

      if (this.sc.filtro.Potenciales || this.sc.filtro.OtrosPotenciales)
      {
        this.esPotencial = true
        existe = false
        let lista:Potencial[] = []

        this.sc.lista_potenciales()
          .then((c:any) => {
            lista = c
            this.potenciales.push(...lista.slice(this.pos, this.pos + 10))
            console.log('Clientes potenciales ', this.potenciales)
            existe = true
          })
      }
      else
      {       
          this.esPotencial = false
          existe = false
          let lista:Cliente[] = []

          lista = this.todos.slice(this.pos, this.pos + 10)
          this.clientes.push(...lista)
          existe = lista.length > 0
      }

      if (!existe && event)
      {
          console.log('Llegamos aquí y pa fuera!!!')
          event.target.disabled = true
          event.target.complete()
          return        
      }

      this.pos += 10

      if (event)
      {
        console.log('hola')
        event.target.complete();
      }
      console.log('Ahora pos vale: ', this.pos)
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

  listar()
  {
      this.clientes = []
      this.potenciales = []
      this.pos = 0
      this.sc.lista_clientes()
        .then((c:any) => {
            this.todos = c
            this.cargar_lista()
        })
  }
}
