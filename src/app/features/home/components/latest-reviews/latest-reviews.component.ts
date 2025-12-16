import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RatingComponent } from '../../../reviews/components/rating/rating.component';
import { ReviewService } from '../../../../core/review/services/review.service';
import { Pagination } from '../../../../shared/models/pagination.model';
import { ReviewDetails } from '../../../../core/review/models/review-details.model';

@Component({
    selector: 'app-latest-reviews',
    imports: [RouterLink, RatingComponent],
    templateUrl: './latest-reviews.component.html',
    styleUrl: './latest-reviews.component.css',
})
export class LatestReviewsComponent {
    reviewService = inject(ReviewService);

    reviews = signal<Pagination<ReviewDetails>>({
        data: [],
        page: 1,
        totalPages: 1,
        totalResults: 0,
    });

    skeletonCount = Array.from({ length: 3 });
    loading = signal(false);

    constructor() {
        effect(() => {
            this.loading.set(true);
            this.reviewService.list({ limit: 3 }).subscribe({
                next: (response) => {
                    this.reviews.set(response);
                },
                error: (err) => {
                    this.loading.set(false);
                    console.error(err);
                },
                complete: () => this.loading.set(false),
            });
        });
    }
}
