import { Component, input, signal } from '@angular/core';
import { RatingComponent } from '../../../reviews/components/rating/rating.component';
import { ReviewStats } from '../../../../core/review/models/review-stats.model';
import { RATINGS } from '../../../../core/review/models/rating.model';

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
