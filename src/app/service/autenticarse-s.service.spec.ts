import { TestBed } from '@angular/core/testing';

import { AutenticarseSService } from './autenticarse-s.service';

describe('AutenticarseSService', () => {
  let service: AutenticarseSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticarseSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
