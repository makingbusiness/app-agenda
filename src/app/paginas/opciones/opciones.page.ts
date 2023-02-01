import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.page.html',
  styleUrls: ['./opciones.page.scss'],
})
export class OpcionesPage implements OnInit {

  constructor(private ruta:Router) 
  { 
      console.log('Recibiendo ', ruta)
  }

  ngOnInit() {
  }

  regresar()
  {
      this.ruta.navigateByUrl('/lista')
  }

  buscar()
  {
      this.ruta.navigateByUrl('/filtro')
  }

  irInicio()
  {
      this.ruta.navigateByUrl("/home")
  }
}
