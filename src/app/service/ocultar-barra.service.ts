import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OcultarBarraService {
  redirectUrl:string;
  @Output() login:EventEmitter<any>=new EventEmitter();
  constructor() { }
}
