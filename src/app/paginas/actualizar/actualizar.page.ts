import { Component, OnInit } from '@angular/core';
import { ActualizarService } from '../../servicios/actualizar.service';
import { Router } from '@angular/router';
import { AgendaService } from '../../servicios/agenda.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage implements OnInit {

  canales:string = ''
  ciudades:string = ''
  clases:string = ''
  clientes:string = ''
  departamentos:string = ''
  paises:string = ''
  sectores:string = ''
  zonas:string = ''
  programaciones:string = ''
  potenciales:string = ''
  otros:string = ''

  constructor(private sc:ActualizarService, private ruta:Router,private agenda:AgendaService) { }

  ngOnInit() {
  }

  actualizar()
  {
    this.sc.actualizar_canales().then((r:any) => this.canales = r)
    this.sc.actualizar_ciudades().then((r:any) => this.ciudades = r)
    this.sc.actualizar_clase_cxc().then((r:any) => this.clases = r)
    this.sc.actualizar_clientes().then((r:any) => this.clientes = r)
    this.sc.actualizar_potenciales().then((r:any) => this.potenciales = r)
    this.sc.actualizar_potenciales_otros().then((r:any) => this.otros = r)
    this.sc.actualizar_departamentos().then((r:any) => this.departamentos = r)
    this.sc.actualizar_paises().then((r:any) => this.paises = r)
    this.sc.actualizar_programaciones_todos().then((r:any) => this.programaciones = r)
    this.sc.actualizar_sectores().then((r:any) => this.sectores = r)
    this.sc.actualizar_zonas().then((r:any) => this.zonas = r)


      /*this.agenda.lista_paises()
          .then((p:any) => {
              this.paises = p.length
      })

      this.agenda.lista_departamentos(0)
          .then((d:any) => {
              this.departamentos = d.length
      })
      
      this.agenda.lista_ciudades(0)
          .then((c:any) => {
              this.ciudades = c.length
      })      

      this.agenda.lista_generica('canales')
          .then((c:any) => {
              this.canales = c.length
      })


      this.agenda.lista_clientes()
      .then((c:any) => {
          this.clientes = c.length
    })*/
  }

  irInicio()
  {
      /*if (this.agenda.paises.length === 0 ||
          this.agenda.dptos.length === 0 ||
          this.agenda.ciudades.length === 0 ||
          this.agenda.clientes.length === 0 ||
          this.agenda.canales.length === 0 ||
          this.agenda.clasesCXC.length === 0
        )
        {
            alert(
              'Países' + this.agenda.paises.length + '<br>' +
              'Dptos' + this.agenda.dptos.length + '<br>' +
              'Ciudades' + this.ciudades.length + '<br>' +
              'Clientes' + this.agenda.clientes.length + '<br>' +
              'Canales' + this.agenda.canales.length + '<br>' +
              'Clases' + this.agenda.clasesCXC.length 
            )
            return
        }*/

      this.ruta.navigateByUrl('/')
  }
}
