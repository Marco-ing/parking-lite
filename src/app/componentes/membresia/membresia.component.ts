import { Component, OnInit, Injectable } from '@angular/core';
import {NgbCalendar, NgbDatepickerI18n, NgbDateStruct,} from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { MembresiaService } from 'src/app/service/membresia.service';
import { FormsModule, FormGroup, FormBuilder, Validators, NgForm, ReactiveFormsModule} from '@angular/forms';


const meses={
  days:['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'],
  months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
}
const I18N_VALUES = {
  'es': {
    weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    weekLabel: 'sem'
  }
  // other languages you would support
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
  language = 'es';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  constructor(private _i18n: I18n) { super(); }

  getWeekdayShortName(weekday: number): string { return I18N_VALUES[this._i18n.language].weekdays[weekday - 1]; }
  getWeekLabel(): string { return I18N_VALUES[this._i18n.language].weekLabel; }
  getMonthShortName(month: number): string { return I18N_VALUES[this._i18n.language].months[month - 1]; }
  getMonthFullName(month: number): string { return this.getMonthShortName(month); }
  getDayAriaLabel(date: NgbDateStruct): string { return `${date.day}-${date.month}-${date.year}`; }
}

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.css'],
  providers:
      [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]  // define custom NgbDatepickerI18n provider

})
export class MembresiaComponent implements OnInit {

  model: NgbDateStruct;
  inicio:string;
  final:string;
  date: {year: number, month: number};
  hoy:{year: number, month: number, day: number};
  total:number;
  tarjeta:FormGroup;
  submitted = false;
  tardat={
    titular:null,
    numero:null,
    expira:null,
    cvv:null
  }

  constructor(private calendar: NgbCalendar,private service:MembresiaService,private formbuilder:FormBuilder) {
    this.hoy=this.calendar.getNext(this.calendar.getToday(),'d',1);
    this.service.getTarifa()
    .pipe(first())
    .subscribe(data=>{
      this.total=data[0].TarifaMembresia;
    });
    this.selectToday();
    this.inicio=meses['days'][this.calendar.getWeekday(this.calendar.getNext(this.calendar.getToday(),'d',1))-1]+" "+this.calendar.getNext(this.calendar.getToday(),'d',1).day+" de "+meses['months'][this.calendar.getNext(this.calendar.getToday(),'d',1).month-1]+" del "+this.calendar.getNext(this.calendar.getToday(),'d',1).year;
    this.final=meses['days'][this.calendar.getWeekday(this.calendar.getNext(this.calendar.getToday(),'d',30))-1]+" "+this.calendar.getNext(this.calendar.getToday(),'d',30).day+" de "+meses['months'][this.calendar.getNext(this.calendar.getToday(),'d',30).month-1]+" del "+this.calendar.getNext(this.calendar.getToday(),'d',30).year;
  }

  ngOnInit(): void {
    this.tarjeta=this.formbuilder.group({
      titular:['',Validators.required],
      numero:['',[Validators.required,Validators.minLength(16)]],
      expira:['',Validators.required],
      cvv:['',Validators.required,Validators.minLength(3),Validators.maxLength(3)]
    });
  }
  
  get f() {return this.tarjeta.controls;}

  AutenticarTarjeta(){
    this.submitted=true;
    if(this.tarjeta.invalid){
      return;
    }
    this.Autenticar_Tarjeta(this.tarjeta);
  }

  Autenticar_Tarjeta(tarjeta){

  }

  onDateSelect($event){
    this.inicio=meses['days'][this.calendar.getWeekday($event)-1]+" "+$event.day+" de "+meses['months'][$event.month-1]+" del "+$event.year;
    this.final=meses['days'][this.calendar.getWeekday(this.calendar.getNext($event,'d',29))-1]+" "+this.calendar.getNext($event,'d',29).day+" de "+meses['months'][this.calendar.getNext($event,'d',29).month-1]+" del "+this.calendar.getNext($event,'d',29).year;
  }

  selectToday() {
    this.model = this.calendar.getNext(this.calendar.getToday(),'d',1);
  }
}
