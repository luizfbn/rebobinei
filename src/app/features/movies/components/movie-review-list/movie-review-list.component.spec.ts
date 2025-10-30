import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieReviewListComponent } from './movie-review-list.component';

describe('MovieReviewListComponent', () => {
  let component: MovieReviewListComponent;
  let fixture: ComponentFixture<MovieReviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieReviewListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
