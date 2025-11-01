import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieReviewStatsComponent } from './movie-review-stats.component';

describe('MovieReviewStatsComponent', () => {
  let component: MovieReviewStatsComponent;
  let fixture: ComponentFixture<MovieReviewStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieReviewStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieReviewStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
