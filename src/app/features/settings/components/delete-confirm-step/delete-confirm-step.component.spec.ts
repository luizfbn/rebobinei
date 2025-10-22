import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmStepComponent } from './delete-confirm-step.component';

describe('DeleteConfirmStepComponent', () => {
  let component: DeleteConfirmStepComponent;
  let fixture: ComponentFixture<DeleteConfirmStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteConfirmStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
