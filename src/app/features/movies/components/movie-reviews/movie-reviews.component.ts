import { Component, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MovieReviewListComponent } from '../movie-review-list/movie-review-list.component';
import { ReviewFormComponent } from '../../../reviews/components/review-form/review-form.component';
import { MovieReviewStatsComponent } from '../movie-review-stats/movie-review-stats.component';
import { MovieReviewItemComponent } from '../movie-review-item/movie-review-item.component';
import { ReviewDetails } from '../../../../core/review/models/review-details.model';
import { ReviewForm } from '../../../reviews/models/review-form.model';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { ReviewService } from '../../../../core/review/services/review.service';
import { MovieStateService } from '../../services/movie-state.service';
import { ReviewContextService } from '../../../reviews/services/review-context.service';

@Component({
    selector: 'app-movie-reviews',
    imports: [
        MovieReviewListComponent,
        ReviewFormComponent,
        MovieReviewStatsComponent,
        MovieReviewItemComponent,
    ],
    templateUrl: './movie-reviews.component.html',
    styleUrl: './movie-reviews.component.css',
})
export class MovieReviewsComponent {
    movieStateService = inject(MovieStateService);
    authService = inject(AuthService);
    reviewService = inject(ReviewService);
    reviewContext = inject(ReviewContextService);

    movieId = input.required<number>();
    page = input.required<number>();

    userReview = signal<ReviewDetails | null>(null);
    loading = signal(false);
    submittingReview = signal(false);

    constructor() {
        effect(() => {
            this.loadUserReview();
        });
        this.reviewContext.reviewDeleted$.pipe(takeUntilDestroyed()).subscribe((deletedId) => {
            const currentReview = this.userReview();
            if (currentReview && currentReview.id === deletedId) {
                this.userReview.set(null);
            }
        });
    }

    loadUserReview() {
        const user = this.authService.currentUser();
        if (!user) return;
        this.loading.set(true);
        this.reviewService.getByUserAndMovie(user.id, this.movieId()).subscribe({
            next: (response) => this.userReview.set(response),
            error: (err) => {
                this.loading.set(false);
                console.error(err);
            },
            complete: () => this.loading.set(false),
        });
    }

    onAddReview(payload: ReviewForm) {
        this.submittingReview.set(true);
        this.movieStateService
            .addReview(this.movieId(), {
                rating: payload.rating,
                comment: payload.comment,
            })
            .subscribe({
                next: () => this.loadUserReview(),
                error: (err) => {
                    this.submittingReview.set(false);
                    console.error(err);
                },
                complete: () => this.submittingReview.set(false),
            });
    }

    onDeleteReview(id: string) {
        this.submittingReview.set(true);
        this.movieStateService.deleteReview(id)?.subscribe({
            next: () => {
                this.userReview.set(null);
                this.reviewContext.notifyDeleteSuccess(id);
            },
            error: (err) => {
                this.submittingReview.set(false);
                console.error(err);
            },
            complete: () => this.submittingReview.set(false),
        });
    }
}
