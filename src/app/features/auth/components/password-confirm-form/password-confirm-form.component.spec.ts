import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordConfirmFormComponent } from './password-confirm-form.component';

describe('PasswordConfirmFormComponent', () => {
  let component: PasswordConfirmFormComponent;
  let fixture: ComponentFixture<PasswordConfirmFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordConfirmFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordConfirmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
