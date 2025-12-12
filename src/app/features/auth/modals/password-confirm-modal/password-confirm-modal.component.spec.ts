import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordConfirmModalComponent } from './password-confirm-modal.component';

describe('PasswordConfirmModalComponent', () => {
  let component: PasswordConfirmModalComponent;
  let fixture: ComponentFixture<PasswordConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordConfirmModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
