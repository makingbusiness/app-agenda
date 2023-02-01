import { Injectable } from '@angular/core';
import * as ForerunnerDB from 'forerunnerdb'  
import { Cliente, Generica, Sector, Zona, Potencial } from '../modelo/Cliente';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Ciudad, Pais, Departamento, Coordenadas } from '../modelo/Ubicacion';
import { Programacion } from '../modelo/Programacion';

const url = environment.url

@Injectable({
  providedIn: 'root'
})
export class ActualizarService {

  fdb:any
  bd:any
  
  canales:Generica[] = []
  ciudades:Ciudad[] = []
  claseCXC:Generica[] = []
  clientes:Cliente[] = []
  potenciales:Potencial[] = []
  potencialesOtros:Potencial[] = []
  departamentos:Departamento[] = []
  paises:Pais[] = []
  sectores:Sector[] = []
  zonas:Zona[] = []
  programaciones:Programacion[] = []
  
  constructor(private http:HttpClient) 
  { 
    this.fdb = new ForerunnerDB()
    this.bd = this.fdb.db('tienda')
  }
  
  leer_archivo(vendedor:string, archivo:string)
  {
    return this.http.get(`${ url }leer_info_agenda/${ vendedor }/${archivo}`)
  }

  actualizar_potenciales()
  {
    const tabla = 'clientes_potenciales'
    let coleccion:any
    let mensaje:string = '...'
    
    console.log('Actualizando potenciales...')
    return new Promise((r,j) => {
    this.leer_archivo('001',tabla)
    .subscribe((u:any) => {
          this.potenciales = u

          coleccion = this.bd.collection(tabla)
          coleccion.remove()

          this.bd.collection(tabla).deferredCalls(tabla)

          this.potenciales.forEach(u => {
            coleccion.insert({
              IDCliente: u.IDCliente,
              Nombre: u.Nombre,
              Nit: u.Nit,
              Clase: u.Clase,
              Represent: u.Represent,
              Contacto: u.Contacto,
              FactA: u.FactA,
              Dir1: u.Dir1,
              Zona: u.Zona,
              Vend: u.Vend,
              Telef: u.Telef,
              Correo: u.Correo,
              Movil: u.Movil,
              Obs: u.Obs,
              Sector: u.Sector,
              Ccial: u.Ccial,
              Canal: u.Canal,
              Pdtos: u.Pdtos,
              Local: u.Local,
              Fecha: u.Fecha,
              Trans: u.Trans,
              CodCiudad: u.CodCiudad,
              SnInfo: u.SnInfo,
              Activo: u.Activo,
              Tel_Administrador: u.Tel_Administrador,
              Tel_Compras: u.Tel_Compras,
              Tel_Tesoreria: u.Tel_Tesoreria,
              CodPais: u.CodPais,
              CodEstado: u.CodEstado,
              ClienteAdmin: u.ClienteAdmin,
              NomAdm: u.NomAdm,
              NomCom: u.NomCom,
              NomTes: u.NomTes
            })
          })

          
          coleccion.save((err:any) => {
            if (err)
            {
                console.log(tabla + ' : ' + JSON.stringify(err))
                mensaje = 'X'
            }
            else 
            {
                console.log(`Coleccion ${ tabla } guardada`)
                mensaje = 'OK'
            }

            r(mensaje)
          })
        })

      })
  }

  actualizar_potenciales_otros()
  {
    const tabla = 'clientes_potenciales_otros'
    let coleccion:any
    let mensaje:string = '...'
    
    console.log('Actualizando potenciales otros...')
    return new Promise((r,j) => {
    this.leer_archivo('001',tabla)
    .subscribe((u:any) => {
          this.potencialesOtros = u

          coleccion = this.bd.collection(tabla)
          coleccion.remove()

          this.bd.collection(tabla).deferredCalls(tabla)

          this.potenciales.forEach(u => {
            coleccion.insert({
              IDCliente: u.IDCliente,
              Nombre: u.Nombre,
              Nit: u.Nit,
              Clase: u.Clase,
              Represent: u.Represent,
              Contacto: u.Contacto,
              FactA: u.FactA,
              Dir1: u.Dir1,
              Zona: u.Zona,
              Vend: u.Vend,
              Telef: u.Telef,
              Correo: u.Correo,
              Movil: u.Movil,
              Obs: u.Obs,
              Sector: u.Sector,
              Ccial: u.Ccial,
              Canal: u.Canal,
              Pdtos: u.Pdtos,
              Local: u.Local,
              Fecha: u.Fecha,
              Trans: u.Trans,
              CodCiudad: u.CodCiudad,
              SnInfo: u.SnInfo,
              Activo: u.Activo,
              Tel_Administrador: u.Tel_Administrador,
              Tel_Compras: u.Tel_Compras,
              Tel_Tesoreria: u.Tel_Tesoreria,
              CodPais: u.CodPais,
              CodEstado: u.CodEstado,
              ClienteAdmin: u.ClienteAdmin,
              NomAdm: u.NomAdm,
              NomCom: u.NomCom,
              NomTes: u.NomTes
            })
          })

          
          coleccion.save((err:any) => {
            if (err)
            {
                console.log(tabla + ' : ' + JSON.stringify(err))
                mensaje = 'X'
            }
            else 
            {
                console.log(`Coleccion ${ tabla } guardada`)
                mensaje = 'OK'
            }

            r(mensaje)
          })
        })

      })
  }
  
  actualizar_programaciones_todos()
  {
    const tabla = 'programaciones_todos'
    let coleccion:any
    let mensaje:string = '...'
    
    console.log('Actualizando programaciones todos...')
    return new Promise((r,j) => {
    this.leer_archivo('001',tabla)
    .subscribe((u:any) => {
          this.programaciones = u

          coleccion = this.bd.collection(tabla)
          coleccion.remove()

          this.bd.collection(tabla).deferredCalls(tabla)

          this.programaciones.forEach(u => {
            coleccion.insert({
              CodClie: u.CodClie,
              Nombre: u.Nombre,
              FechaProg: u.FechaProg,
              HoraProgramacion: u.HoraProgramacion,
              FechaVisita: u.FechaVisita,
              HoraVisita: u.HoraVisita,
              NoCompra: u.NoCompra,
              Observaciones: u.Observaciones,
              Vendedor: u.Vendedor,
              Enviado: u.Enviado
            })
          })

          
          coleccion.save((err:any) => {
            if (err)
            {
                console.log(tabla + ' : ' + JSON.stringify(err))
                mensaje = 'X'
            }
            else 
            {
                console.log(`Coleccion ${ tabla } guardada`)
                mensaje = 'OK'
            }

            r(mensaje)
          })
        })

      })
  }  

  actualizar_clase_cxc()
  {
    const tabla = 'clases_cxc'
    let coleccion:any
    let mensaje:string = '...'
    
    console.log('Actualizando clases cxc...')
    return new Promise((r,j) => {
    this.leer_archivo('001',tabla)
    .subscribe((u:any) => {
          this.claseCXC = u

          coleccion = this.bd.collection(tabla)
          coleccion.remove()

          this.bd.collection(tabla).deferredCalls(tabla)

          this.claseCXC.forEach(u => {
            coleccion.insert({
              Id: u.Id,
              Descrip: u.Descrip,
            })
          })

          
          coleccion.save((err:any) => {
            if (err)
            {
                console.log(tabla + ' : ' + JSON.stringify(err))
                mensaje = 'X'
            }
            else 
            {
                console.log(`Coleccion ${ tabla } guardada`)
                mensaje = 'OK'
            }

            r(mensaje)
          })
        })

      })
  }  

  actualizar_canales()
  {
    const tabla = 'canales'
    let coleccion:any
    let mensaje:string = ''
    
    console.log('Actualizando canales...')

    return new Promise((r,j) => {
    this.leer_archivo('001',tabla)
    .subscribe((u:any) => {
          this.canales = u

          coleccion = this.bd.collection(tabla)
          coleccion.remove()

          this.bd.collection(tabla).deferredCalls(tabla)

          this.canales.forEach(u => {
            coleccion.insert({
              Id: u.Id,
              Descrip: u.Descrip,
            })
          })

          coleccion.save((err:any) => {
            if (err)
            {
                console.log(tabla + ' : ' + JSON.stringify(err))
                mensaje = 'X'
            }
            else 
            {
                console.log(`Coleccion ${ tabla } guardada`)
                mensaje = 'OK'
            }

            r(mensaje)
          })
        })
      })
  }
  
  actualizar_paises()
  {
    const tabla = 'paises'
    let coleccion:any
    let mensaje = ''
    
    console.log('Actualizando paises...')

    return new Promise((r,j) => {
    this.leer_archivo('001',tabla)
    .subscribe((u:any) => {
          this.paises = u

          coleccion = this.bd.collection(tabla)
          coleccion.remove()

          this.bd.collection(tabla).deferredCalls(tabla)

          this.paises.forEach(u => {
            coleccion.insert({
              Pais: u.Pais,
              NombrePais: u.NombrePais,
            })
          })

          coleccion.save((err:any) => {
            if (err)
            {
                console.log(tabla + ' : ' + JSON.stringify(err))
                mensaje = 'X'
            }
            else 
            {
                console.log(`Coleccion ${ tabla } guardada`)
                mensaje = 'OK'
            }

            r(mensaje)
          })
        })
      })
  }  

  actualizar_departamentos()
  {
    const tabla = 'departamentos'
    let coleccion:any
    let mensaje = ''
    
    console.log('Actualizando departamentos...')

    return new Promise((r,j) => {
    this.leer_archivo('001',tabla)
    .subscribe((u:any) => {
          this.departamentos = u

          coleccion = this.bd.collection(tabla)
          coleccion.remove()

          this.bd.collection(tabla).deferredCalls(tabla)

          this.departamentos.forEach(u => {
            coleccion.insert({
              Estado: u.Estado,
              NombreEstado: u.NombreEstado,
              Pais: u.Pais,
              NombrePais: u.NombrePais
            })
          })

          coleccion.save((err:any) => {
            if (err)
            {
                console.log(tabla + ' : ' + JSON.stringify(err))
                mensaje = 'X'
            }
            else 
            {
                console.log(`Coleccion ${ tabla } guardada`)
                mensaje = 'OK'
            }

            r(mensaje)
          })
        })
      })
  }
  
  actualizar_ciudades()
  {
    const tabla = 'ciudades'
    let coleccion:any
    let mensaje = ''
    
    console.log('Actualizando ciudades...')

    return new Promise((r,j) => {
    this.leer_archivo('001',tabla)
    .subscribe((u:any) => {
          this.ciudades = u

          coleccion = this.bd.collection(tabla)
          coleccion.remove()

          this.bd.collection(tabla).deferredCalls(tabla)

          this.ciudades.forEach(u => {
            coleccion.insert({
              Pais: u.Pais,
              NombrePais: u.NombrePais,
              Estado: u.Estado,
              NombreEstado: u.NombreEstado,
              Ciudad: u.Ciudad,
              NombreCiudad: u.NombreCiudad
            })
          })

          coleccion.save((err:any) => {
            if (err)
            {
                console.log(tabla + ' : ' + JSON.stringify(err))
                mensaje = 'X'
            }
            else 
            {
                console.log(`Coleccion ${ tabla } guardada`)
                mensaje = 'OK'
            }

            r(mensaje)
          })
        })
      })
  }  

  actualizar_clientes()
  {
      const tabla = 'clientes'
      let coleccion:any
      let mensaje = ''

      console.log('Actualizando clientes...')

      return new Promise((r,j) => {
      this.leer_archivo('001','clientes')
        .subscribe((c:any) => {
            this.clientes = c

            coleccion = this.bd.collection(tabla)
            coleccion.remove()

            this.bd.collection(tabla).deferredCalls(false)

            this.clientes.forEach(c => {
              coleccion.insert({
                  codclie: c.codclie,
                  descrip: c.descrip,
                  clase: c.clase,
                  represent: c.represent,
                  direc1: c.direc1,
                  pais: c.pais,
                  estado: c.estado,
                  ciudad: c.ciudad,
                  telef: c.telef,
                  movil: c.movil,
                  email: c.email,
                  fecha: c.fecha,
                  codzona: c.codzona,
                  observa: c.observa,
                  saldo: c.saldo,
                  fechauv: c.fechauv,
                  montouv: c.montouv,
                  numerouv: c.numerouv,
                  fechaup: c.fechaup,
                  montoup: c.montoup,
                  numeroup: c.numeroup,
                  docfaltantes: c.docfaltantes,
                  fuvw: c.fuvw,
                  montouvw: c.montouvw,
                  cartera: c.cartera,
                  adicionales: c.adicionales,
                  notas: c.notas,
                  observaciones: c.observaciones

              })
            })

            coleccion.save((err:any) => {
              if (err)
              {
                  console.log(tabla + ' : ' + JSON.stringify(err))
                  mensaje = 'X'
              }
              else 
              {
                  console.log(`Coleccion ${ tabla } guardada`)
                  mensaje = 'OK'
              }

              r(mensaje)
            })
        })
      })
  }

  actualizar_sectores()
  {
    const tabla = 'sectores'
    let coleccion:any
    let mensaje = ''
    
    console.log('Actualizando sectores...')

    return new Promise((r,j) => {
    this.leer_archivo('001',tabla)
    .subscribe((u:any) => {
          this.sectores = u

          coleccion = this.bd.collection(tabla)
          coleccion.remove()

          this.bd.collection(tabla).deferredCalls(tabla)

          this.sectores.forEach(u => {
            coleccion.insert({
              CodSector: u.CodSector,
              Descrip: u.Descrip,
              CodZona: u.CodZona
            })
          })

          coleccion.save((err:any) => {
            if (err)
            {
                console.log(tabla + ' : ' + JSON.stringify(err))
                mensaje = 'X'
            }
            else 
            {
                console.log(`Coleccion ${ tabla } guardada`)
                mensaje = 'OK'
            }

            r(mensaje)
          })
        })
      })
  }  

  actualizar_zonas()
  {
    const tabla = 'zonas'
    let coleccion:any
    let mensaje = ''
    
    console.log('Actualizando zonas...')

    return new Promise((r,j) => {
    this.leer_archivo('001',tabla)
    .subscribe((u:any) => {
          this.zonas = u

          coleccion = this.bd.collection(tabla)
          coleccion.remove()

          this.bd.collection(tabla).deferredCalls(tabla)

          this.zonas.forEach(u => {
            coleccion.insert({
              CodZona: u.CodZona,
              Descrip: u.Descrip,
            })
          })

          coleccion.save((err:any) => {
            if (err)
            {
                console.log(tabla + ' : ' + JSON.stringify(err))
                mensaje = 'X'
            }
            else 
            {
                console.log(`Coleccion ${ tabla } guardada`)
                mensaje = 'OK'
            }

            r(mensaje)
          })
        })
      })
  }  

  actualizar_coordenadas(lista:Coordenadas[])
  {
    const tabla = 'coordenadas'
    let coleccion:any
    let mensaje = ''

    console.log('Actualizando coordenadas...')

    return new Promise((r,j) => {

          coleccion = this.bd.collection(tabla)

          this.bd.collection(tabla).deferredCalls(tabla)

          lista.forEach(c => {
            coleccion.insert({
               Fecha: c.Fecha,
               Hora: c.Hora,
               Latitud: c.Latitud,
               Longitud: c.Longitud
            })
          })

          coleccion.save((err:any) => {
            if (err)
            {
                console.log(tabla + ' : ' + JSON.stringify(err))
                mensaje = JSON.stringify(err)
            }
            else 
            {
                console.log(`Coleccion ${ tabla } guardada`)
                mensaje = 'OK'
            }

            r(mensaje)
          })
        })
  }  

  actualizar_programacion(programaciones:Programacion[])
  {
    const tabla = 'programaciones'
    let coleccion:any
    let mensaje = ''

    console.log('Actualizando programacion...', )

    return new Promise((r,j) => {

          coleccion = this.bd.collection(tabla)

          this.bd.collection(tabla).deferredCalls(tabla)

          programaciones.forEach(p =>{
            coleccion.insert({
                CodClie: p.CodClie,
                Nombre: p.Nombre,
                FechaProg: p.FechaProg,
                HoraProgramacion: p.HoraProgramacion,
                FechaVisita: p.HoraVisita,
                NoCompra: p.NoCompra,
                Observaciones: p.Observaciones,
                Vendedor: p.Vendedor,
                Enviado: p.Enviado
            })
          })

          coleccion.save((err:any) => {
            if (err)
            {
                console.log(tabla + ' : ' + JSON.stringify(err))
                mensaje = JSON.stringify(err)
            }
            else 
            {
                console.log(`Coleccion ${ tabla } guardada`)
                mensaje = 'OK'
            }

            r(mensaje)
          })
        })
  }  
}
