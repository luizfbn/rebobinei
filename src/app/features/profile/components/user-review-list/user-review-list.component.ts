import { Component, effect, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserReviewItemComponent } from '../user-review-item/user-review-item.component';
import { PageSelectorComponent } from '../../../../shared/components/page-selector/page-selector.component';
import { Pagination } from '../../../../shared/models/pagination.model';
import { ReviewWithMovie } from '../../../../core/review/models/review-with-movie.model';

@Component({
    selector: 'app-user-review-list',
    imports: [UserReviewItemComponent, PageSelectorComponent],
    templateUrl: './user-review-list.component.html',
    styleUrl: './user-review-list.component.css',
})
export class UserReviewListComponent {
    router = inject(Router);
    route = inject(ActivatedRoute);

    userId = input.required<string>();
    page = input.required<number>();

    reviews = {
        page: 1,
        totalPages: 100,
        totalResults: 2,
        data: [
            {
                id: '123',
                rating: 4,
                comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.`,
                createdAt: '2025-10-15',
                movie: {
                    tmdbId: 123,
                    title: 'Superman',
                    originalTitle: 'Superman',
                    overview: 'Superman bla bla bla',
                    posterUrl:
                        'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/xeZ8oG6W60fEPf9yCjERUXiHRBF.jpg',
                    backdropUrl:
                        'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/xeZ8oG6W60fEPf9yCjERUXiHRBF.jpg',
                },
            },
        ],
    } as Pagination<ReviewWithMovie>;

    constructor() {
        effect(() => {
            console.log(`A URL mudou, buscando dados para a página: ${this.page()}`);
        });
    }

    navigateToPage(newPage: number) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { page: newPage },
            queryParamsHandling: 'merge',
        });
    }
}
