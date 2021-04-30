import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaReservacionComponent } from './tabla-reservacion.component';

describe('TablaReservacionComponent', () => {
  let component: TablaReservacionComponent;
  let fixture: ComponentFixture<TablaReservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaReservacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaReservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
