import { Component, effect, inject, input, output, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserReviewItemComponent } from '../user-review-item/user-review-item.component';
import { PageSelectorComponent } from '../../../../shared/components/page-selector/page-selector.component';
import { Pagination } from '../../../../shared/models/pagination.model';
import { ReviewWithMovie } from '../../../../core/review/models/review-with-movie.model';
import { User } from '../../../../core/user/models/user.model';
import { UserService } from '../../../../core/user/services/user.service';
import { ReviewContextService } from '../../../reviews/services/review-context.service';

@Component({
    selector: 'app-user-review-list',
    imports: [UserReviewItemComponent, PageSelectorComponent],
    templateUrl: './user-review-list.component.html',
    styleUrl: './user-review-list.component.css',
})
export class UserReviewListComponent {
    userService = inject(UserService);
    reviewContext = inject(ReviewContextService);
    router = inject(Router);
    route = inject(ActivatedRoute);

    userId = input.required<string>();
    page = input.required<number>();
    currentUser = input<User | null>();
    delete = output<string>();
    isDeletingReview = input(false);

    skeletonCount = Array.from({ length: 5 });
    loading = signal(false);

    reviews = signal<Pagination<ReviewWithMovie>>({
        data: [],
        page: 1,
        totalPages: 1,
        totalResults: 0,
    });

    constructor() {
        effect(() => {
            this.loadUserReviews();
        });
        this.reviewContext.reviewDeleted$.pipe(takeUntilDestroyed()).subscribe(() => {
            this.page() === 1 ? this.loadUserReviews() : this.navigateToPage(1);
        });
    }

    loadUserReviews() {
        this.loading.set(true);
        this.userService.listUserReviews(this.userId(), { page: this.page() }).subscribe({
            next: (reviews) => this.reviews.set(reviews),
            error: (err) => {
                this.loading.set(false);
                console.error(err);
            },
            complete: () => this.loading.set(false),
        });
    }

    onDeleteReview(id: string) {
        this.delete.emit(id);
    }

    navigateToPage(newPage: number) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { page: newPage },
            queryParamsHandling: 'merge',
        });
    }
}
