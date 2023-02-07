import { Component, OnInit } from '@angular/core';
import { Pais, Departamento, Ciudad } from '../../modelo/Ubicacion';
import { AgendaService } from '../../servicios/agenda.service';
import { Generica, Sector, Zona } from '../../modelo/Cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.page.html',
  styleUrls: ['./filtro.page.scss'],
})
export class FiltroPage implements OnInit {

  esPais:boolean = false
  paises:Pais[] = []
  paisSel:number = 0

  esDpto:boolean = false
  dptos:Departamento[] = []
  dptoSel:number = 0

  esCiudad:boolean = false
  ciudades:Ciudad[] = []
  ciudadSel:number = 0

  esCanal:boolean = false
  canales:Generica[] = []
  canalSel:string = ''

  esClase:boolean = false
  clases:Generica[] = []
  claseSel:string = ''

  esSector:boolean = false
  sectores:Sector[] = []
  sectorSel:number = 0

  esZona:boolean = false
  zonas:Zona[] = []
  zonaSel:string = ''

  esDato:boolean = false
  textoSel:string = ''

  esPotencial:boolean = false
  esOtroPotencial:boolean = false

  constructor(private agenda:AgendaService, private ruta:Router) 
  { 
      console.log('Cargando datos inicio....', this.agenda.paises)
      this.paises = this.agenda.paises
      this.paisSel = 2
    
      this.cambioPais()
    
      this.canales = this.agenda.canales   
      this.clases = this.agenda.clasesCXC
      this.sectores = this.agenda.sectores
      this.zonas = this.agenda.zonas
  }

  ionViewWillEnter()
  {
      this.esPais = this.agenda.filtro.Pais > 0
      if (this.esPais) this.paisSel = this.agenda.filtro.Pais

      this.esDpto = this.agenda.filtro.Estado > 0
      if (this.esDpto) this.dptoSel  = this.agenda.filtro.Estado

      this.esCiudad = this.agenda.filtro.Ciudad > 0
      if (this.esCiudad) this.ciudadSel = this.agenda.filtro.Ciudad

      this.esCanal = this.agenda.filtro.Canal.length > 0
      if (this.esCanal) this.canalSel = this.agenda.filtro.Canal

      this.esClase = this.agenda.filtro.Clase.length > 0
      if (this.esClase) this.claseSel = this.agenda.filtro.Clase

      this.esDato = this.agenda.filtro.Dato.source.length > 0
      this.textoSel  = this.agenda.filtro.Dato.source.includes('(?') ? '' : this.agenda.filtro.Dato.source

      this.esSector = this.agenda.filtro.Sector > 0
      if (this.esCanal) this.sectorSel = this.agenda.filtro.Sector

      this.esZona = this.agenda.filtro.Zona.length > 0
      if (this.esZona) this.zonaSel = this.agenda.filtro.Zona
  }
  
  ngOnInit() 
  {
  }
  
  carga_inicio()
  {

  }

  cambioPais()
  {
      this.dptos = this.agenda.dptos.filter(d => d.Pais === this.paisSel)
      this.dptoSel = this.dptos[0].Estado
      this.cambioDpto()
  }

  cambioDpto()
  {
    this.ciudades = this.agenda.ciudades.filter(c => c.Estado === this.dptoSel)
    console.log('Cambiando a ciudades de ', this.dptoSel,' => ', this.agenda.ciudades)
  }

  cambioCiudad()
  {

  }

  cambioCanal()
  {

  }

  cambioClase()
  {

  }

  cambioSector()
  {

  }

  cambioZona()
  {

  }

  buscar()
  {
      //this.limpiar_filtro()

      const dato = this.esDato ? this.textoSel : ''
      this.agenda.filtro = {
        Canal: this.esCanal ? this.canalSel : '',
        Ciudad: this.esCiudad ? this.ciudadSel : 0,
        Clase: this.esClase ? this.claseSel : '',
        Dato: new RegExp(dato),
        Estado: this.esDpto ? this.dptoSel : 0,
        FechaDesde: '',
        FechaHasta: '',
        Pais: this.esPais ? this.paisSel : 0,
        Potenciales: this.esPotencial,
        OtrosPotenciales: this.esOtroPotencial,
        Programacion: 'T',
        DatoMay: new RegExp(dato.toUpperCase()),
        Sector: this.esSector ? this.sectorSel : 0,
        Zona: this.esZona ? this.zonaSel : ''
      }

      console.log('Mostrando lista de clientes ', this.canalSel)
      this.ruta.navigateByUrl('/lista')
  }

  limpiar_filtro()
  {
      this.agenda.filtro = {
        Canal: '',
        Ciudad: 0,
        Clase: '',
        Dato: new RegExp(""),
        DatoMay: new RegExp(""),
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
  }

  irInicio()
  {
      this.ruta.navigateByUrl("/")
  }

  crear()
  {
      this.ruta.navigateByUrl('opciones')
  }
}
