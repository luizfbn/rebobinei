import { Component, effect, inject, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MediaCardComponent } from '../../../../shared/components/media-card/media-card.component';
import { PageSelectorComponent } from '../../../../shared/components/page-selector/page-selector.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../../../core/movie/services/movie.service';
import { MovieListItem } from '../../../movies/models/movie-list-item.model';

@Component({
    selector: 'app-search-list',
    imports: [MediaCardComponent, PageSelectorComponent, DatePipe],
    templateUrl: './search-list.component.html',
    styleUrl: './search-list.component.css',
})
export class SearchListComponent {
    router = inject(Router);
    route = inject(ActivatedRoute);
    movieService = inject(MovieService);

    query = input.required<string>();
    page = input.required<number>();

    movies = signal<MovieListItem[]>([]);
    totalPages = signal(1);
    loading = signal(false);
    skeletonCount = Array.from({ length: 10 });

    constructor() {
        effect(() => {
            const query = this.query();
            if (!query) return;
            this.loading.set(true);
            this.movieService.search(query, { page: this.page() }).subscribe({
                next: (response) => {
                    if (this.totalPages() !== response.totalPages) {
                        this.totalPages.set(response.totalPages);
                    }
                    this.movies.set(response.data);
                },
                error: (err) => {
                    this.loading.set(false);
                    console.error(err);
                },
                complete: () => this.loading.set(false),
            });
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
