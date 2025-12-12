import { TestBed } from '@angular/core/testing';

import { PasswordConfirmModalService } from './password-confirm-modal.service';

describe('PasswordConfirmModalService', () => {
  let service: PasswordConfirmModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordConfirmModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
