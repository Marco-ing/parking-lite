import { Component, OnInit, Injectable } from '@angular/core';
import {NgbCalendar, NgbDateAdapter, NgbDatepickerI18n, NgbDateStruct,} from '@ng-bootstrap/ng-bootstrap';
const meses={
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
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    var fecha=date.day + " de " + meses['months'][date.month-1] + " del " + date.year;
    return date ? fecha : null;
  }
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
      [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
        {provide: NgbDateAdapter, useClass: CustomAdapter}]  // define custom NgbDatepickerI18n provider

})
export class MembresiaComponent implements OnInit {

  model: NgbDateStruct;
  model1: NgbDateStruct;
  date: {year: number, month: number};
  hoy:{year: number, month: number, day: number};

  constructor(private calendar: NgbCalendar,private dateAdapter: NgbDateAdapter<string>) {
    this.hoy=this.calendar.getNext(this.calendar.getToday(),'d',1);
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  ngOnInit(): void {
  }
  
}
