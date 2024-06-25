import { TestBed } from '@angular/core/testing';

import { BlagajnaService } from './blagajna.service';

describe('BlagajnaService', () => {
  let service: BlagajnaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlagajnaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
