import { TestBed } from '@angular/core/testing';

import { TerenService } from './teren.service';

describe('TerenService', () => {
  let service: TerenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
