import { Component, OnInit } from '@angular/core';
import { Nota } from '../../modelo/Cliente';
import { AgendaService } from '../../servicios/agenda.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit {

  notas:Nota[] = []

  constructor(private sc:AgendaService) 
  { 
  }
  
  ngOnInit() 
  {  
      this.notas = this.sc.cliente.notas
  }

}
