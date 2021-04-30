import { TestBed } from '@angular/core/testing';

import { PagarventaService } from './pagarventa.service';

describe('PagarventaService', () => {
  let service: PagarventaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagarventaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
