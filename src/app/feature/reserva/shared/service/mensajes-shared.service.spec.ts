import { TestBed } from '@angular/core/testing';

import { MensajesSharedService } from './mensajes-shared.service';

describe('MensajesSharedService', () => {
  let service: MensajesSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajesSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
