import { TestBed } from '@angular/core/testing';

import { MostarEntradasService } from './mostar-entradas.service';

describe('MostarEntradasService', () => {
  let service: MostarEntradasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostarEntradasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
