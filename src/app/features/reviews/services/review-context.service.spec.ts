import { TestBed } from '@angular/core/testing';

import { ReviewContextService } from './review-context.service';

describe('ReviewContextService', () => {
  let service: ReviewContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
