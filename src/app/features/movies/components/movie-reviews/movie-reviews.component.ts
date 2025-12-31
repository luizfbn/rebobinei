import {
    Component,
    effect,
    inject,
    input,
    signal,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, filter, finalize, switchMap, tap } from 'rxjs';
import { createAlert, showAlert } from '../../../../shared/utils/alert.util';
import { MovieReviewListComponent } from '../movie-review-list/movie-review-list.component';
import { ReviewFormComponent } from '../../../reviews/components/review-form/review-form.component';
import { MovieReviewStatsComponent } from '../movie-review-stats/movie-review-stats.component';
import { MovieReviewCurrentUserComponent } from '../movie-review-current-user/movie-review-current-user.component';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { ReviewDetails } from '../../../../core/review/models/review-details.model';
import { ReviewForm } from '../../../reviews/models/review-form.model';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { ReviewService } from '../../../../core/review/services/review.service';
import { MovieStateService } from '../../services/movie-state.service';
import { ReviewContextService } from '../../../reviews/services/review-context.service';
import { ReviewDeleteConfirmModalService } from '../../../reviews/modals/review-delete-confirm-modal/review-delete-confirm-modal.service';

@Component({
    selector: 'app-movie-reviews',
    imports: [
        MovieReviewListComponent,
        ReviewFormComponent,
        MovieReviewStatsComponent,
        MovieReviewCurrentUserComponent,
        AlertComponent,
    ],
    templateUrl: './movie-reviews.component.html',
    styleUrl: './movie-reviews.component.css',
})
export class MovieReviewsComponent {
    movieStateService = inject(MovieStateService);
    authService = inject(AuthService);
    reviewService = inject(ReviewService);
    reviewDeleteConfirmModalService = inject(ReviewDeleteConfirmModalService);
    reviewContext = inject(ReviewContextService);

    @ViewChild('reviewDeleteConfirmModal', { read: ViewContainerRef })
    reviewDeleteConfirmModalContainer!: ViewContainerRef;

    movieId = input.required<number>();
    page = input.required<number>();

    userReview = signal<ReviewDetails | null>(null);
    loading = signal(false);
    isSubmittingReview = signal(false);
    alert = createAlert();
    showAlert = showAlert;

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
        this.isSubmittingReview.set(true);
        this.movieStateService
            .addReview(this.movieId(), {
                rating: payload.rating,
                comment: payload.comment,
            })
            .subscribe({
                next: () => this.loadUserReview(),
                error: (err) => {
                    this.isSubmittingReview.set(false);
                    console.error(err);
                    this.alert.set({ type: 'error', message: err.error?.message, show: true });
                },
                complete: () => this.isSubmittingReview.set(false),
            });
    }

    onDeleteReview(id: string) {
        const reviewDeleteModal = this.reviewDeleteConfirmModalService.open(
            this.reviewDeleteConfirmModalContainer
        );

        reviewDeleteModal.afterClosed
            .pipe(
                filter((confirmDelete) => confirmDelete === true),
                tap(() => this.isSubmittingReview.set(true)),
                switchMap(() => this.movieStateService.deleteReview(id) ?? EMPTY),
                finalize(() => this.isSubmittingReview.set(false))
            )
            .subscribe({
                next: () => this.reviewContext.notifyDeleteSuccess(id),
                error: (err) => {
                    console.error(err);
                    this.alert.set({ type: 'error', message: err.error?.message, show: true });
                },
            });
    }
}
