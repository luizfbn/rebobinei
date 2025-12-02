import { Component, effect, inject, input, output, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieReviewItemComponent } from '../movie-review-item/movie-review-item.component';
import { PageSelectorComponent } from '../../../../shared/components/page-selector/page-selector.component';
import { User } from '../../../../core/user/models/user.model';
import { MovieStateService } from '../../services/movie-state.service';

@Component({
    selector: 'app-movie-review-list',
    imports: [MovieReviewItemComponent, PageSelectorComponent],
    templateUrl: './movie-review-list.component.html',
    styleUrl: './movie-review-list.component.css',
})
export class MovieReviewListComponent {
    movieStateService = inject(MovieStateService);
    router = inject(Router);
    route = inject(ActivatedRoute);

    movieId = input.required<number>();
    page = input.required<number>();
    currentUser = input<User | null>();
    delete = output<string>();
    deletingReview = input(false);

    skeletonCount = Array.from({ length: 3 });
    loading = signal(false);

    constructor() {
        effect(() => {
            this.loading.set(true);
            this.movieStateService.loadReviews(this.movieId()).subscribe({
                error: (err) => {
                    this.loading.set(false);
                    console.log(err);
                },
                complete: () => this.loading.set(false),
            });
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
