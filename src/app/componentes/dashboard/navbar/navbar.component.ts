import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public MostrarBarra:Boolean;

  constructor() { }

  ngOnInit(): void {
  }

  Ocultarbarra(): void{
    this.MostrarBarra=true;
    
  }

}
