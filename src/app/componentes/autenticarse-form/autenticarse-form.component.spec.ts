import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticarseFormComponent } from './autenticarse-form.component';

describe('AutenticarseFormComponent', () => {
  let component: AutenticarseFormComponent;
  let fixture: ComponentFixture<AutenticarseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutenticarseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutenticarseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
