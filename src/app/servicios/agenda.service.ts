import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as ForerunnerDB from 'forerunnerdb';
import { Cliente, Generica, Sector, Zona, Potencial } from '../modelo/Cliente';
import { Filtro } from '../modelo/Filtro';
import { Pais, Departamento, Ciudad, Coordenadas } from '../modelo/Ubicacion';
import { Programacion } from '../modelo/Programacion';


const url = environment.url
@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  fdb:any
  bd:any

  clientes:Cliente[] = []
  cliente: Cliente
  potencial:Potencial
  esPotencial:boolean = false

  noCompra:string[] = ['','TIENE INVENTARIO','DUEÑO AUSENTE','NO TIENE DINERO','LOCAL CERRADO','PENDIENTE DE PAGO']

  filtro:Filtro = {
    Canal: '',
    Ciudad: 0,
    Clase: '',
    Dato: new RegExp(''),
    DatoMay: new RegExp(''),
    Estado: 0,
    FechaDesde: '',
    FechaHasta: '',
    Pais: 0,
    Potenciales: false,
    OtrosPotenciales: false,
    Programacion: 'T',
    Sector: 0,
    Zona: ''
  }

  paises:Pais[] = []
  dptos:Departamento[] = []
  ciudades:Ciudad[] = []
  clasesCXC:Generica[] = []
  canales:Generica[] = []
  sectores:Sector[] = []
  zonas:Zona[] = []

  constructor(private http:HttpClient) 
  { 
      this.fdb = new ForerunnerDB()
      this.bd = this.fdb.db('tienda')

      this.cargar_listas()
  }    

  cargar_listas()
  {
      console.log('Inicio de servicio, cargando países')
      this.lista_paises()
          .then((p:any) => {
            this.paises = p

          })
          
      this.lista_departamentos(0)
        .then((d:any) => {
            this.dptos = d

          })

      this.lista_ciudades(0).then((c:any) => this.ciudades = c)
      
      this.lista_generica('clases_cxc').then((c:any) => this.clasesCXC = c)

      this.lista_generica('canales').then((c:any) => this.canales = c)

      this.lista_sectores().then((s:any) => this.sectores = s)

      this.lista_zonas().then((z:any) => this.zonas = z)

  }
    
    lista_clientes()
    {
      let coleccion = this.bd.collection('clientes')
      let lista:Cliente[] = []

      let filtroCons = null

      let filtroPais = null
      let filtroEstado = null
      let filtroCiudad = null
      let filtroCanal = null
      let filtroClase = null
      let filtroDato = null
      let filtroSector = null
      let filtroZona = null
      let filtroPotencial = null
      let filtroPotencialOtro = null

      if (this.filtro.Estado !== 0)
      {
        filtroEstado = {
          estado: {
            $eq: this.filtro.Estado
          }
        }
      }

      if (this.filtro.Ciudad !== 0)
      {
        filtroCiudad = {
          ciudad: {
            $eq: this.filtro.Ciudad
          }
        }
      }      

      if (this.filtro.Clase.length > 0)
      {
          filtroClase = {
            clase: {
              $eq: this.filtro.Clase
            }
          }
      }

      if (this.filtro.Canal.length > 0)
      {
          filtroClase = {
            adicionales: {
              canal: {
                $eq: this.filtro.Canal
              }
            }
          }
      }

      if (this.filtro.Dato)
      {
          filtroDato = {
              $or: [{
                codclie: this.filtro.Dato
              },{
                descrip: this.filtro.Dato
              },{
                descrip: this.filtro.DatoMay
              }]
            }
      }

      if (this.filtro.Sector > 0)
      {
          filtroSector = {
              adicionales: {
                sector: {
                    $eq: this.filtro.Sector
                }
              }
          }
      }

      if (this.filtro.Zona.length > 0)
      {
          filtroZona = {
            codzona : {
              $eq: this.filtro.Zona
            }
          }
      }

      if (this.filtro.Potenciales)
      {
          filtroPotencial = {
              Tipo : {
                  $eq: 'Potencial'
              }
          }
      }

      if (this.filtro.OtrosPotenciales)
      {
          filtroPotencial = {
              Tipo : {
                  $eq: 'Otros'
              }
          }
      }

      filtroCons = {
        $and: [
          filtroCanal,
          filtroCiudad,
          filtroClase,
          filtroDato,
          filtroEstado,
          filtroPais,
          filtroSector,
          filtroZona,
          filtroPotencial,
          filtroPotencialOtro
        ]
      }

      return new Promise((r,j) => {

          coleccion.load((e: any,t: any,s: any) => {

               lista = coleccion.find(
                filtroCons, { 
                  $orderBy: {
                      descrip: 1
                  }
                }
               )

              r(lista)
          })
      })
    }

    lista_potenciales()
    {
      let coleccion = this.bd.collection('clientes_potenciales')
      let lista:Potencial[] = []

      let filtroCons = null

      let filtroPais = null
      let filtroEstado = null
      let filtroCiudad = null
      let filtroCanal = null
      let filtroClase = null
      let filtroDato = null
      let filtroSector = null
      let filtroZona = null
      let filtroPotencial = null
      let filtroPotencialOtro = null

      if (this.filtro.Estado !== 0)
      {
        filtroEstado = {
          estado: {
            $eq: this.filtro.Estado
          }
        }
      }

      if (this.filtro.Ciudad !== 0)
      {
        filtroCiudad = {
          ciudad: {
            $eq: this.filtro.Ciudad
          }
        }
      }      

      if (this.filtro.Clase.length > 0)
      {
          filtroClase = {
            clase: {
              $eq: this.filtro.Clase
            }
          }
      }

      if (this.filtro.Canal.length > 0)
      {
          filtroClase = {
            adicionales: {
              canal: {
                $eq: this.filtro.Canal
              }
            }
          }
      }

      if (this.filtro.Dato)
      {
          filtroDato = {
              $or: [{
                codclie: this.filtro.Dato
              },{
                descrip: this.filtro.Dato
              },{
                descrip: this.filtro.DatoMay
              }]
            }
      }

      if (this.filtro.Sector > 0)
      {
          filtroSector = {
              adicionales: {
                sector: {
                    $eq: this.filtro.Sector
                }
              }
          }
      }

      if (this.filtro.Zona.length > 0)
      {
          filtroZona = {
            codzona : {
              $eq: this.filtro.Zona
            }
          }
      }

      if (this.filtro.Potenciales)
      {
          if (this.filtro.OtrosPotenciales)
          {
              filtroPotencial = {
                 $or: [{
                    tipo: { $eq: 'Potencial'}
                 },{
                    tipo: { $eq: 'Otros'}
                 }]
              }
          }
          else
          {
              filtroPotencial = {
                  tipo : {
                      $eq: 'Potencial'
                  }
              }
          }
      }

      if (this.filtro.OtrosPotenciales && !this.filtro.Potenciales)
      {
          filtroPotencialOtro = {
              tipo : {
                  $eq: 'Otros'
              }
          }
      }

      filtroCons = {
        $and: [
          filtroCanal,
          filtroCiudad,
          filtroClase,
          filtroDato,
          filtroEstado,
          filtroPais,
          filtroSector,
          filtroZona,
          filtroPotencial,
          filtroPotencialOtro
        ]
      }

      return new Promise((r,j) => {

          coleccion.load((e: any,t: any,s: any) => {

               lista = coleccion.find(
                filtroCons, { 
                  $orderBy: {
                      descrip: 1
                  }
                }
               )

              r(lista)
          })
      })
    }    

    info_cliente(dato: string)
    {
      let coleccion = this.bd.collection('clientes')
      //const info:Cliente = 
      return coleccion.find({ codclie: {"$eq": dato }})
  
      //return info
    }    

    lista_generica(tabla:string)
    {
      let coleccion = this.bd.collection(tabla)
      let lista:Generica[] = []
      return new Promise((r,j) => {
        coleccion.load((e: any,t: any,s: any) => {

          lista = coleccion.find({}, { $orderBy: { Descrip: 1 }})

           r(lista)
        })
      })
    }
    
    lista_paises()
    {
      let coleccion = this.bd.collection('paises')
      let lista:Pais[] = []
      return new Promise((r,j) => {
        coleccion.load((e: any,t: any,s: any) => {

          lista = coleccion.find({})

           r(lista)
        })
      })
    }    

    lista_departamentos(pais:number)
    {
      console.log('Obteniendo departamentos de ', pais)
      let coleccion = this.bd.collection('departamentos')
      let lista:Departamento[] = []

      const filtro = pais === 0 ? {} : { Pais: { $eq: pais}}

      return new Promise((r,j) => {
        coleccion.load((e: any,t: any,s: any) => {

          lista = coleccion.find(filtro, { $orderBy: { NombreEstado: 1}})

           r(lista)
        })
      })
    }

    lista_ciudades(departamento:number)
    {
      let coleccion = this.bd.collection('ciudades')
      let lista:Ciudad[] = []

      const filtro = departamento === 0 ? {} : { Estado: { $eq: departamento }}
      
      return new Promise((r,j) => {
        coleccion.load((e: any,t: any,s: any) => {

          lista = coleccion.find(filtro, { $orderBy: { NombreCiudad: 1 }})

           r(lista)
        })
      })
    }

    lista_sectores()
    {
      let coleccion = this.bd.collection('sectores')
      let lista:Sector[] = []
      return new Promise((r,j) => {
        coleccion.load((e: any,t: any,s: any) => {

          lista = coleccion.find({})

           r(lista)
        })
      })
    } 

    lista_zonas()
    {
      let coleccion = this.bd.collection('zonas')
      let lista:Zona[] = []
      return new Promise((r,j) => {
        coleccion.load((e: any,t: any,s: any) => {

          lista = coleccion.find({})

           r(lista)
        })
      })
    }    

    lista_coordenadas()
    {
      let coleccion = this.bd.collection('coordenadas')
      let lista:Coordenadas[] = []
      return new Promise((r,j) => {
        coleccion.load((e: any,t: any,s: any) => {

          lista = coleccion.find({})

           r(lista)
        })
      })
    }

    lista_programaciones()
    {
      let coleccion = this.bd.collection('programaciones')
      let lista:Programacion[] = []
      return new Promise((r,j) => {
        coleccion.load((e: any,t: any,s: any) => {

          lista = coleccion.find({})

           r(lista)
        })
      })
    }

    lista_programaciones_todos()
    {
      let coleccion = this.bd.collection('programaciones_todos')
      let lista:Programacion[] = []
      return new Promise((r,j) => {
        coleccion.load((e: any,t: any,s: any) => {

          lista = coleccion.find({})

           r(lista)
        })
      })
    }

    programacion_cliente(dato: string)
    {
      let coleccion = this.bd.collection('programaciones')
      let lista:Programacion[] = []
      return new Promise((r,j) => {
        coleccion.load((e: any,t: any,s: any) => {

          lista = coleccion.find({
            CodClie: {
              $eq: dato
            }
          })

           r(lista)
        })
      })
    }

    programacion_cliente_todo(dato: string)
    {
      let coleccion = this.bd.collection('programaciones_todos')
      let lista:Programacion[] = []
      return new Promise((r,j) => {
        coleccion.load((e: any,t: any,s: any) => {

          lista = coleccion.find({
            CodClie: {
              $eq: dato
            }
          })

           r(lista)
        })
      })
    }
}
