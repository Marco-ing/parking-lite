import { Component, OnInit, AfterViewInit, ViewChild,Injectable } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { first } from 'rxjs/operators';
import { MostarEntradasService } from 'src/app/service/mostar-entradas.service';


export interface ReservacionData{
  id:string;
  fecha:string;
  horainicio:string;
  horafinal:string;
  monto:string;
  idsocio:string;
  idestacionamiento:string;
}
@Component({
  selector: 'app-tabla-reservacion',
  templateUrl: './tabla-reservacion.component.html',
  styleUrls: ['./tabla-reservacion.component.css']
})
export class TablaReservacionComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator2: MatPaginator;
  @ViewChild(MatSort) sort2: MatSort;
  displayedColumns2: string[] = ['id','fecha','horainicio', 'horafinal', 'monto','idsocio','idestacionamiento'];
  dataSource2: MatTableDataSource<ReservacionData>; 
  
  ngOnInit(): void {
    
  }
  

  constructor(private service:MostarEntradasService) {
    this.service.getReservaciones()
    .pipe(first())
    .subscribe(data=>{
      const reservas=Array<ReservacionData>();
      var i=0;
      while(data[i]){
        var fecha=new Date(data[i]['FechaInicio']);
        var fin=new Date(data[i]['FechaFinal']);
        console.log(fecha);
        reservas.push({
          id:data[i]['IdReservacion'],
          fecha:fecha.getFullYear()+"/"+(fecha.getUTCMonth()+1)+"/"+fecha.getDate(),
          horainicio:fecha.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' }),
          horafinal:fin.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' }),
          monto:data[i]['Monto'],
          idsocio:data[i]['IdSocio'],
          idestacionamiento:data[i]['IdEstacionamientoSocio']
        });
        i++;
      }
      this.dataSource2 = new MatTableDataSource(reservas);
      this.dataSource2.paginator=this.paginator2;
      this.paginator2._intl.itemsPerPageLabel = 'Elementos por página: ';
      this.dataSource2.sort = this.sort2;
    });
  }

  ngAfterViewInit() {
    
    
  }

  
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

}
