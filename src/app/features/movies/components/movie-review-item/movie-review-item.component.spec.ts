import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieReviewItemComponent } from './movie-review-item.component';

describe('MovieReviewItemComponent', () => {
  let component: MovieReviewItemComponent;
  let fixture: ComponentFixture<MovieReviewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieReviewItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieReviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
