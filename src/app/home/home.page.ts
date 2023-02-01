import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation'
import { Cliente } from '../modelo/Cliente';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AgendaService } from '../servicios/agenda.service';
import { ActualizarService } from '../servicios/actualizar.service';
import { Coordenadas } from '../modelo/Ubicacion';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  ruta:string = ''
  clientes:Cliente[] = []
  mensaje:string = ''
  coord:Coordenadas[] = []

  constructor(private router:Router, private agenda:AgendaService, private act:ActualizarService) 
  {
      this.ruta = 'Buscando info en ' + environment.url
      agenda.cargar_listas()
  }

  ngOnInit()
  {
      this.agenda.lista_coordenadas()
          .then((c:any) => {
              this.coord = c

              this.cargar_ubicacion()
          })
  }
    
    async cargar_ubicacion()
    {      
        const coordenadas = await Geolocation.getCurrentPosition()
        const fecha = new Date()

        const hoy:Coordenadas = {
          Fecha: fecha.toLocaleDateString(),
          Hora: fecha.toLocaleTimeString(),
          Latitud: coordenadas.coords.latitude.toString(),
          Longitud: coordenadas.coords.longitude.toString()
        }

        this.coord = [ ...this.coord, hoy]

        console.log('Coordenadas: ', coordenadas.coords)
        this.act.actualizar_coordenadas(this.coord)
            .then((r:any) => console.log(r))
    }

  ionViewWillEnter()
  {
      this.mensaje = '' 
  }
  actualizar()
  {
      this.router.navigateByUrl('actualizar')
  }

  buscar()
  {
     
      this.router.navigateByUrl('filtro')
  }

  enviar()
  {
      console.log('Enviando reportes')
  }

}
