import { Component, input, signal } from '@angular/core';
import { ReviewStats } from '../../../reviews/models/review-stats';
import { RatingComponent } from '../../../reviews/components/rating/rating.component';
import { RATINGS } from '../../../reviews/models/rating.model';

@Component({
    selector: 'app-movie-review-stats',
    imports: [RatingComponent],
    templateUrl: './movie-review-stats.component.html',
    styleUrl: './movie-review-stats.component.css',
    host: {
        class: 'max-w-50',
    },
})
export class MovieReviewStatsComponent {
    stats = input.required<ReviewStats>();
    items = signal([...RATINGS].reverse());
}
