import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../../servicios/agenda.service';
import { Cliente } from '../../modelo/Cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  clientes:Cliente[] = []

  constructor(private sc:AgendaService, private ruta:Router) { }

  ngOnInit() 
  {
    console.log('Cargando lista de clientes...')
    this.cargar_lista()
  }

  cargar_lista()
  {
      this.clientes = []
      this.sc.lista_clientes()
        .then((c:any) => {
          this.clientes = c
        })
  }

  verDetalle(cliente:Cliente)
  {      
      this.sc.cliente = cliente
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
