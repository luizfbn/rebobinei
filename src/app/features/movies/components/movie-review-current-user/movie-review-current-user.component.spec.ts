import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieReviewCurrentUserComponent } from './movie-review-current-user.component';

describe('MovieReviewCurrentUserComponent', () => {
  let component: MovieReviewCurrentUserComponent;
  let fixture: ComponentFixture<MovieReviewCurrentUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieReviewCurrentUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieReviewCurrentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
