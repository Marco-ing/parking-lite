import { Component, OnInit, AfterViewInit, ViewChild,Injectable } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { first } from 'rxjs/operators';
import { MostarEntradasService } from 'src/app/service/mostar-entradas.service';

export interface MembresiaData{
  idventa:string;
  FechaInicio:string;
  FechaFinal:string;
  Monto:string;
  IdSocio:string;
  IdEstacionamiento:string;
}

@Component({
  selector: 'app-tabla-membresia',
  templateUrl: './tabla-membresia.component.html',
  styleUrls: ['./tabla-membresia.component.css']
})
export class TablaMembresiaComponent implements OnInit, AfterViewInit{
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['idventa', 'FechaInicio', 'FechaFinal', 'Monto','IdSocio','IdEstacionamiento'];
  dataSource: MatTableDataSource<MembresiaData>; 
  
  ngOnInit(): void {
    
  }
  

  constructor(private service:MostarEntradasService) {
    this.service.getMembresia()
    .pipe(first())
    .subscribe(data=>{
      const ventas=Array<MembresiaData>();
      var i=0;
      while(data[i]){
        var fecha = new Date(data[i]['FechaInicio']);
        var fin = new Date(data[i]['FechaFinal']);
        ventas.push({
          idventa:data[i]['IdMembresia'],
          FechaInicio:fecha.getFullYear()+"/"+(fecha.getUTCMonth()+1)+"/"+fecha.getDate(),
          FechaFinal:fin.getFullYear()+"/"+(fin.getUTCMonth()+1)+"/"+fin.getDate(),
          Monto:data[i]['Monto'],
          IdSocio:data[i]['IdSocio'],
          IdEstacionamiento:data[i]['IdEstacionamientoSocio']
        });
        i++;
      }
      this.dataSource = new MatTableDataSource(ventas);
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Elementos por página: ';
      this.dataSource.sort = this.sort;
    });
  }
  ngAfterViewInit() {
    
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
