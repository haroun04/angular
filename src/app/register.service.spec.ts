import { TestBed } from '@angular/core/testing';

import { ReguisterService } from './register.service';

describe('RegisterService', () => {
  let service: ReguisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReguisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
