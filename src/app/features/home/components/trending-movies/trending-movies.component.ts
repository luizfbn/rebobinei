import { DatePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaCardComponent } from '../../../../shared/components/media-card/media-card.component';
import { Pagination } from '../../../../shared/models/pagination.model';
import { MovieListItem } from '../../../../core/movie/models/movie-list-item.model';
import { MovieService } from '../../../../core/movie/services/movie.service';

@Component({
    selector: 'app-trending-movies',
    imports: [RouterLink, DatePipe, MediaCardComponent],
    templateUrl: './trending-movies.component.html',
    styleUrl: './trending-movies.component.css',
})
export class TrendingMoviesComponent {
    movieService = inject(MovieService);

    movies = signal<Pagination<MovieListItem>>({
        data: [],
        page: 1,
        totalPages: 1,
        totalResults: 0,
    });

    skeletonCount = Array.from({ length: 5 });
    loading = signal(false);

    constructor() {
        effect(() => {
            this.loading.set(true);
            this.movieService.list({ category: 'trending' }).subscribe({
                next: (response) => {
                    const limitedResponse = {
                        ...response,
                        data: response.data.slice(0, 6),
                    };
                    this.movies.set(limitedResponse);
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
