import { Component, OnInit, Injectable } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDatepickerI18n, NgbDateStruct, } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { MembresiaService } from 'src/app/service/membresia.service';
import { FormsModule, FormGroup, FormBuilder, Validators, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

const meses = {
  days: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
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
    [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }]  // define custom NgbDatepickerI18n provider

})
export class MembresiaComponent implements OnInit {

  model: NgbDateStruct;
  inicio: string;
  final: string;
  titular: string;
  date: { year: number, month: number, day: number };
  datef: { year: number, month: number, day: number };
  hoy: { year: number, month: number, day: number };
  total: number;
  tarjeta: FormGroup;
  submitted = false;
  tardat = {
    titular: null,
    numero: null,
    expira: null,
    cvv: null
  }

  constructor(private calendar: NgbCalendar, private service: MembresiaService, private formbuilder: FormBuilder,
    private router: Router, private titleService: Title) {
    this.hoy = this.calendar.getNext(this.calendar.getToday(), 'd', 1);
    this.date = this.calendar.getNext(this.calendar.getToday(), 'd', 1);
    this.datef = this.calendar.getNext(this.calendar.getToday(), 'd', 30);
    this.service.getTarifa()
      .pipe(first())
      .subscribe(data => {
        this.total = data[0].TarifaMembresia;
        var user = JSON.parse(localStorage.getItem('token'));
        (<HTMLInputElement>document.getElementById("titular")).value = user.titulartarjeta;
        var aux = user.numtarjeta;
        var tar = "";
        for (var i = 0; i < 16; i++) {
          tar += aux[i];
          if (i == 3 || i == 7 || i == 11) {
            tar += " ";
          }
        }
        (<HTMLInputElement>document.getElementById("numero")).value = tar;
        this.tardat.titular = user.titulartarjeta;
        this.tardat.numero = tar;
      });
    this.selectToday();
    this.inicio = meses['days'][this.calendar.getWeekday(this.calendar.getNext(this.calendar.getToday(), 'd', 1)) - 1] + " " + this.calendar.getNext(this.calendar.getToday(), 'd', 1).day + " de " + meses['months'][this.calendar.getNext(this.calendar.getToday(), 'd', 1).month - 1] + " del " + this.calendar.getNext(this.calendar.getToday(), 'd', 1).year;
    this.final = meses['days'][this.calendar.getWeekday(this.calendar.getNext(this.calendar.getToday(), 'd', 30)) - 1] + " " + this.calendar.getNext(this.calendar.getToday(), 'd', 30).day + " de " + meses['months'][this.calendar.getNext(this.calendar.getToday(), 'd', 30).month - 1] + " del " + this.calendar.getNext(this.calendar.getToday(), 'd', 30).year;

  }

  ngOnInit(): void {
    this.tarjeta = this.formbuilder.group({
      titular: ['', Validators.required],
      numero: ['', [Validators.required, Validators.minLength(19)]],
      expira: ['', [Validators.required, Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.titleService.setTitle("Membresía");
  }

  get f() { return this.tarjeta.controls; }

  AutenticarTarjeta() {
    this.submitted = true;
    if (this.tarjeta.invalid) {
      return;
    }
    this.Autenticar_Tarjeta(this.tarjeta);
  }

  Autenticar_Tarjeta(tarjeta) {
    var user = JSON.parse(localStorage.getItem('token'));
    var id = user.idusuario;
    this.service.insertMem(id, this.date, this.datef, this.total)
      .pipe(first())
      .subscribe(data => {
        Swal.fire({
          title: 'Membresia adquirida.',
          html: "Id de membresia: " + data[0][0] + "<br>Cajon de estacionamiento: " + data[0][1] + "<br>Fecha de inicio: " + this.inicio + "<br>Fecha de vencimiento: " + this.final,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        const redirect = this.service.redirectUrl ? this.service.redirectUrl : '/home';
        this.router.navigate([redirect]);
      },
        error => {
          Swal.fire({
            title: 'Membresia rechazada.',
            text: 'Por el momento no contamos con lugares disponibles para tu membresia. Por favor intentalo más tarde.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        });
  }

  onDateSelect($event) {
    this.date = this.calendar.getNext($event, 'd', 0);
    this.datef = this.calendar.getNext($event, 'd', 30);
    this.inicio = meses['days'][this.calendar.getWeekday($event) - 1] + " " + $event.day + " de " + meses['months'][$event.month - 1] + " del " + $event.year;
    this.final = meses['days'][this.calendar.getWeekday(this.calendar.getNext($event, 'd', 29)) - 1] + " " + this.calendar.getNext($event, 'd', 29).day + " de " + meses['months'][this.calendar.getNext($event, 'd', 29).month - 1] + " del " + this.calendar.getNext($event, 'd', 29).year;
  }

  selectToday() {
    this.model = this.calendar.getNext(this.calendar.getToday(), 'd', 1);
  }

  Expiracion($event) {
    var inputValue = (<HTMLInputElement>document.getElementById("expira")).value;
    console.log($event);
    if (inputValue.length == 0) {
      if (Number($event.key) > 1) {
        return false;
      }
    }
    if (inputValue.length == 1) {
      if (inputValue == "0" && $event.key == "0") {
        return false;
      }
      if (inputValue == "1" && Number($event.key) > 2) {
        return false;
      }
    }
    if (inputValue.length == 2) {
      if (Number($event.key) < 2) {
        return false;
      }
      (<HTMLInputElement>document.getElementById("expira")).value = inputValue + "/";
    }
    if (inputValue.length == 4 && inputValue[3] == "2" && Number($event.key) == 0) {
      return false;
    }
    return ($event.charCode >= 48 && $event.charCode <= 57);
  }

  quitarslash($event) {
    if ($event.key == "Backspace" || $event.key == "Delete") {
      var inputValue = (<HTMLInputElement>document.getElementById("expira")).value;
      if (inputValue.length == 4) {
        (<HTMLInputElement>document.getElementById("expira")).value = inputValue.substring(0, inputValue.length - 1);
      }
    }
  }

  Tarjetanumero($event) {
    var inputValue = (<HTMLInputElement>document.getElementById("numero")).value;
    if (inputValue.length == 4 || inputValue.length == 9 || inputValue.length == 14) {
      (<HTMLInputElement>document.getElementById("numero")).value = inputValue + " ";
    }
    return ($event.charCode >= 48 && $event.charCode <= 57);
  }

  quitarespacio($event) {
    if ($event.key == "Backspace" || $event.key == "Delete") {
      var inputValue = (<HTMLInputElement>document.getElementById("numero")).value;
      if (inputValue.length == 6 || inputValue.length == 11 || inputValue.length == 16) {
        (<HTMLInputElement>document.getElementById("numero")).value = inputValue.substring(0, inputValue.length - 1);
      }
    }
  }
  valnom($event) {
    return (($event.charCode >= 65 && $event.charCode <= 90) || ($event.charCode >= 97 && $event.charCode <= 122) || ($event.charCode == 193) || ($event.charCode == 201) || ($event.charCode == 205) || ($event.charCode == 211) || ($event.charCode == 218) || ($event.charCode == 225) || ($event.charCode == 233) || ($event.charCode == 237) || ($event.charCode == 243) || ($event.charCode == 250) || ($event.charCode == 32))
  }
  valcvv($event) {
    return ($event.charCode >= 48 && $event.charCode <= 57);
  }
}
