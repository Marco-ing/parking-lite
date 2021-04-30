import { TestBed } from '@angular/core/testing';

import { ObtenerTarifaHoraService } from './obtener-tarifa-hora.service';

describe('ObtenerTarifaHoraService', () => {
  let service: ObtenerTarifaHoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtenerTarifaHoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
