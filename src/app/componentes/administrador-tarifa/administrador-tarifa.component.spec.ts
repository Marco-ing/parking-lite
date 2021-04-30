import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorTarifaComponent } from './administrador-tarifa.component';

describe('AdministradorTarifaComponent', () => {
  let component: AdministradorTarifaComponent;
  let fixture: ComponentFixture<AdministradorTarifaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorTarifaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorTarifaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
