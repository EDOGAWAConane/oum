import { TestBed } from '@angular/core/testing';

import { MaxSizeService } from './max-size.service';

describe('MaxSizeService', () => {
  let service: MaxSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaxSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
