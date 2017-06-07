import { TestBed, inject } from '@angular/core/testing';

import { SepaService } from './sepa.service';

describe('SepaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SepaService]
    });
  });

  it('should be created', inject([SepaService], (service: SepaService) => {
    expect(service).toBeTruthy();
  }));
});
