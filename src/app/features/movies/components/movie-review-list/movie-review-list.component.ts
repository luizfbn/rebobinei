import { Component, inject, input, signal } from '@angular/core';
import { MovieReviewItemComponent } from '../movie-review-item/movie-review-item.component';
import { Pagination } from '../../../../shared/models/pagination.model';
import { ReviewWithAuthor } from '../../../reviews/models/review-with-author.model';
import { PageSelectorComponent } from '../../../../shared/components/page-selector/page-selector.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-movie-review-list',
    imports: [MovieReviewItemComponent, PageSelectorComponent],
    templateUrl: './movie-review-list.component.html',
    styleUrl: './movie-review-list.component.css',
})
export class MovieReviewListComponent {
    router = inject(Router);
    route = inject(ActivatedRoute);
    movieId = input.required<string>();
    page = input.required<number>();

    reviews = signal<Pagination<ReviewWithAuthor>>({
        page: 1,
        totalPages: 2,
        totalResults: 2,
        data: [
            {
                id: '1',
                rating: 4,
                comment: 'Bla bla',
                createdAt: '2025-07-09T00:00:00.000Z',
                author: {
                    id: '123',
                    name: 'Sandro Jorge',
                    username: 'lilsandro',
                },
            },
            {
                id: '2',
                rating: 5,
                comment: 'Bla bla 2',
                createdAt: '2025-07-09T00:00:00.000Z',
                author: {
                    id: '124',
                    name: 'Jorge Jorge',
                    username: 'jjorge',
                },
            },
            {
                id: '3',
                rating: 5,
                comment: 'Bla bla 3',
                createdAt: '2025-07-09T00:00:00.000Z',
                author: {
                    id: '125',
                    name: 'Sandro Sandro',
                    username: 'ssandro',
                },
            },
        ],
    });

    navigateToPage(newPage: number) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { page: newPage },
            queryParamsHandling: 'merge',
        });
    }
}
