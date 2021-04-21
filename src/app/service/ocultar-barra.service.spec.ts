import { TestBed } from '@angular/core/testing';

import { OcultarBarraService } from './ocultar-barra.service';

describe('OcultarBarraService', () => {
  let service: OcultarBarraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OcultarBarraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
