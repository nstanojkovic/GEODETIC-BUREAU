import { TestBed } from '@angular/core/testing';

import { KatastarService } from './katastar.service';

describe('KatastarService', () => {
  let service: KatastarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KatastarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
