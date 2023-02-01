import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from '../../servicios/agenda.service';
import { Cliente, Nota, Adicionales, Generica } from '../../modelo/Cliente';
import { Pais, Departamento, Ciudad } from '../../modelo/Ubicacion';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  dato:string = ''
  cliente!:Cliente
  notas:Nota[] = []

  canalSel = ''
  canales:Generica[] = []

  claseSel = ''
  clases:Generica[] = []

  paisSel:number = 0
  paises:Pais[] = []
  dptoSel:number = 0
  dptos:Departamento[] = []
  ciudadSel:number = 0
  ciudades:Ciudad[] = []

  info:Adicionales = {
    canal: '',
    centro_comercial: '',
    contacto: '',
    facturar_a: '',
    observaciones: '',
    productos: '',
    referencia1: '',
    referencia2: '',
    referencia3: '',
    referencia4: '',
    sector: '',
    tel_administrador: '',
    tel_compras: '',
    tel_tesoreria: '',
    transportadora: ''
  }

  constructor(private ruta:Router, private sc:AgendaService) 
  { 
      /*this.dato = ruta.url.split('/')[2]
      console.log('Recibiendo ', this.dato)*/
  }
    
  ngOnInit() 
  {
        this.cargar_datos()
        this.sc.lista_generica('canales')
            .then((c:any) => {
              this.canales = c
            })

        this.sc.lista_generica('clases_cxc')
            .then((c:any) => {
              this.clases = c
            })

        this.sc.lista_paises()
            .then((p:any) => {
              this.paises = p

              this.paisSel = this.paises[0].Pais
              this.listar_departamentos(this.paises[0].Pais)
            })

  }

  listar_departamentos(pais:number)
  {
      console.log('Estados de ', pais)
      this.sc.lista_departamentos(pais)
      .then((d:any) => {
        this.dptos = d

        if (this.dptoSel === 0) this.dptoSel = this.dptos[0].Estado
        this.listar_ciudades(this.dptoSel)
      })
  }

  listar_ciudades(dpto:number)
  {
      console.log('Ciudades de ', dpto)
      this.sc.lista_ciudades(dpto)
      .then((c:any) => {
        this.ciudades = c

        if (this.ciudadSel === 0) this.ciudadSel = this.ciudades[0].Ciudad
      })      
  }

  cargar_datos()
  {
      console.log('Cargando datos de ', this.dato)
      this.cliente = this.sc.cliente // this.sc.info_cliente(this.dato)[0]
      this.info = this.cliente.adicionales
      console.log('Datos del cliente ' + JSON.stringify(this.cliente))
//      this.notas = this.cliente.notas

      this.claseSel = this.cliente.clase
      this.canalSel = this.info.canal

      this.paisSel = this.cliente.pais
      this.dptoSel = this.cliente.estado
      this.ciudadSel = this.cliente.ciudad

      if (this.dptoSel !== this.cliente.estado) this.listar_departamentos(this.paisSel)

  }

  

  cambiarPais()
  {
      console.log('País sel ', this.paisSel)
      this.listar_departamentos(this.paisSel)
  }

  cambiarDpto()
  {
      console.log('Departamento sel ', this.dptoSel)
      this.listar_ciudades(this.dptoSel)
  }

  programar()
  {
      this.sc.cliente = this.cliente
      this.ruta.navigate(['/detalle-programacion'])
  }
}
