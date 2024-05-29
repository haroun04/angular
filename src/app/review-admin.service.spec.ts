import { TestBed } from '@angular/core/testing';

import { ReviewAdminService } from './review-admin.service';

describe('ReviewAdminService', () => {
  let service: ReviewAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
