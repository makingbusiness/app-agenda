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

  clientes:Cliente[] = []
  potenciales:Potencial[] = []
  esPotencial:boolean = false

  constructor(private sc:AgendaService, private ruta:Router) { }

  ngOnInit() 
  {
    console.log('Cargando lista de clientes...')
    this.cargar_lista()
  }

  cargar_lista()
  {
      this.potenciales = []
      this.clientes = []
      
      if (this.sc.filtro.Potenciales || this.sc.filtro.OtrosPotenciales)
      {
        console.log('Listando potenciales')
        this.esPotencial = true
        this.sc.lista_potenciales()
          .then((c:any) => {
            this.potenciales = c
            console.log('Clientes potenciales ', this.potenciales)
          })
      }
      else
      {       
        console.log('Son clientes')
          this.esPotencial = false
          this.sc.lista_clientes()
            .then((c:any) => {
              this.clientes = c
              console.log('Clientes ', this.clientes)
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
}
