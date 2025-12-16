import { DatePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../../../core/movie/services/movie.service';
import { Pagination } from '../../../../shared/models/pagination.model';
import { MovieListItem } from '../../../../core/movie/models/movie-list-item.model';

@Component({
    selector: 'app-upcoming-movies',
    imports: [RouterLink, DatePipe],
    templateUrl: './upcoming-movies.component.html',
    styleUrl: './upcoming-movies.component.css',
})
export class UpcomingMoviesComponent {
    movieService = inject(MovieService);

    movies = signal<Pagination<MovieListItem>>({
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
            this.movieService.list({ category: 'upcoming' }).subscribe({
                next: (response) => {
                    const limitedResponse = {
                        ...response,
                        data: response.data.slice(0, 3),
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
