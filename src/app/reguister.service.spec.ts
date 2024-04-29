import { TestBed } from '@angular/core/testing';

import { ReguisterService } from './reguister.service';

describe('ReguisterService', () => {
  let service: ReguisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReguisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
