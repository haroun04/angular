import { TestBed } from '@angular/core/testing';

import { CreateRestAdminService } from './create-rest-admin.service';

describe('CreateRestAdminService', () => {
  let service: CreateRestAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateRestAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
