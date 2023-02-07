import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from '../../servicios/agenda.service';
import { Cliente, Nota, Adicionales, Generica, Potencial } from '../../modelo/Cliente';
import { Pais, Departamento, Ciudad } from '../../modelo/Ubicacion';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  //cliente!:Cliente | Potencial
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

  info = {
    codclie: '',
    descrip: '',
    contacto: '',
    represent: '',
    direc1: '',
    email: '',
    telef: '',
    movil: ''
  }

  esOtro:boolean = false

  /*info:Adicionales = {
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
  }*/

  constructor(private ruta:Router, public sc:AgendaService) 
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
      this.esOtro = false

      if (this.sc.esPotencial)
      {
          this.info = {
            codclie: this.sc.potencial.codclie,
            descrip: this.sc.potencial.descrip,
            contacto: this.sc.potencial.contacto,
            direc1: this.sc.potencial.direc1,
            email: this.sc.potencial.email,
            movil: this.sc.potencial.movil,
            represent: this.sc.potencial.represent,
            telef: this.sc.potencial.telef
          }
    
          this.claseSel = this.sc.potencial.clase
          this.canalSel = this.sc.potencial.canal.toString()
    
          this.paisSel = this.sc.potencial.pais
          this.dptoSel = this.sc.potencial.estado
          this.ciudadSel = this.sc.potencial.ciudad

          this.esOtro = this.sc.potencial.tipo == "Otros"
    
          if (this.dptoSel !== this.sc.potencial.estado) this.listar_departamentos(this.paisSel)
      }
      else
      {
          this.info = {
            codclie: this.sc.cliente.codclie,
            contacto: this.sc.cliente.adicionales.contacto,
            descrip: this.sc.cliente.descrip,
            direc1: this.sc.cliente.direc1,
            email: this.sc.cliente.email,
            movil: this.sc.cliente.movil,
            represent: this.sc.cliente.represent,
            telef: this.sc.cliente.telef
          }
    
          this.claseSel = this.sc.cliente.clase
          this.canalSel = this.sc.cliente.adicionales.canal
    
          this.paisSel = this.sc.cliente.pais
          this.dptoSel = this.sc.cliente.estado
          this.ciudadSel = this.sc.cliente.ciudad
    
          if (this.dptoSel !== this.sc.cliente.estado) this.listar_departamentos(this.paisSel)
      }

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

  guardar()
  {
      console.log('Guardando ', this.info)
  }

  programar()
  {
/*      if (this.sc.esPotencial)
      {
          this.sc.potencial = this.cliente as Potencial
      }
      else
      {
          this.sc.cliente = this.cliente as Cliente
      }
*/
      this.ruta.navigate(['/detalle-programacion'])
  }
}
