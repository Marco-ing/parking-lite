import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMembresiaComponent } from './tabla-membresia.component';

describe('TablaMembresiaComponent', () => {
  let component: TablaMembresiaComponent;
  let fixture: ComponentFixture<TablaMembresiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaMembresiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaMembresiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
