import { TestBed } from '@angular/core/testing';

import { PrintapiService } from './printapi.service';

describe('PrintapiService', () => {
  let service: PrintapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
