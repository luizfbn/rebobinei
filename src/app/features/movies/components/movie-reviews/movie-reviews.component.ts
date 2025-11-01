import { Component, input } from '@angular/core';
import { MovieReviewListComponent } from '../movie-review-list/movie-review-list.component';
import { ReviewFormComponent } from '../../../reviews/components/review-form/review-form.component';
import { MovieReviewStatsComponent } from '../movie-review-stats/movie-review-stats.component';
import { ReviewStats } from '../../../reviews/models/review-stats';

@Component({
    selector: 'app-movie-reviews',
    imports: [MovieReviewListComponent, ReviewFormComponent, MovieReviewStatsComponent],
    templateUrl: './movie-reviews.component.html',
    styleUrl: './movie-reviews.component.css',
})
export class MovieReviewsComponent {
    movieId = input.required<string>();
    reviewStats = input.required<ReviewStats>();
    page = input.required<number>();

    onReview(payload: any /* CreateReview payload */) {
        console.log('Review', payload);
    }
}
