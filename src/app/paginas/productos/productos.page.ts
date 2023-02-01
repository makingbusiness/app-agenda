import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../../servicios/agenda.service';
import { Coordenadas } from '../../modelo/Ubicacion';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  coordenadas:Coordenadas[] = []
  constructor(private agenda:AgendaService) { }

  ngOnInit() 
  {
      this.agenda.lista_coordenadas()
        .then((c:any) => {
          console.log('Esto es lo que hay en coords ', c)
          this.coordenadas = c
          console.log('Total coordenadas: ', this.coordenadas.length)
        })
  }

}
