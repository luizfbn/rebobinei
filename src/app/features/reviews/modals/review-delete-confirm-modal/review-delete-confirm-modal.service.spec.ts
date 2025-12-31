import { TestBed } from '@angular/core/testing';

import { ReviewDeleteConfirmModalService } from './review-delete-confirm-modal.service';

describe('ReviewDeleteConfirmModalService', () => {
  let service: ReviewDeleteConfirmModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewDeleteConfirmModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
