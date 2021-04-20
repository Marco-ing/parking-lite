import { TestBed } from '@angular/core/testing';

import { AutenticarseGuard } from './autenticarse.guard';

describe('AutenticarseGuard', () => {
  let guard: AutenticarseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutenticarseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
