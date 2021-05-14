import { Component, OnInit, AfterViewInit, ViewChild,Injectable } from '@angular/core';
import { TablaMembresiaComponent } from '../tabla-membresia/tabla-membresia.component';
import { TablaReservacionComponent } from '../tabla-reservacion/tabla-reservacion.component';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-mostrar-entradas',
  templateUrl: './mostrar-entradas.component.html',
  styleUrls: ['./mostrar-entradas.component.css']
})
export class MostrarEntradasComponent implements OnInit, AfterViewInit{

  constructor(private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle("Registro de Entradas");
  }

  ngAfterViewInit() {
    
    
  }

}

