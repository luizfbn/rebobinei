import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDeleteConfirmModalComponent } from './review-delete-confirm-modal.component';

describe('ReviewDeleteConfirmModalComponent', () => {
  let component: ReviewDeleteConfirmModalComponent;
  let fixture: ComponentFixture<ReviewDeleteConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewDeleteConfirmModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewDeleteConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
