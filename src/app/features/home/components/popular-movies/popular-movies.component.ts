import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pagination } from '../../../../shared/models/pagination.model';
import { MovieListItem } from '../../../../core/movie/models/movie-list-item.model';
import { MovieService } from '../../../../core/movie/services/movie.service';

@Component({
    selector: 'app-popular-movies',
    imports: [RouterLink],
    templateUrl: './popular-movies.component.html',
    styleUrl: './popular-movies.component.css',
})
export class PopularMoviesComponent implements OnInit, OnDestroy {
    movieService = inject(MovieService);

    activeMovie = signal<MovieListItem | null>(null);
    movies = signal<Pagination<MovieListItem>>({
        data: [],
        page: 1,
        totalPages: 1,
        totalResults: 0,
    });

    skeletonCount = Array.from({ length: 5 });
    loading = signal(false);

    readonly autoPlay = signal(true);
    private intervalId: number = 0;

    constructor() {
        effect(() => {
            this.loading.set(true);
            this.movieService.list({ category: 'popular' }).subscribe({
                next: (response) => {
                    const limitedResponse = {
                        ...response,
                        data: response.data.slice(0, 5),
                    };
                    this.movies.set(limitedResponse);
                    this.activeMovie.set(limitedResponse.data[0] ?? null);
                },
                error: (err) => {
                    this.loading.set(false);
                    console.error(err);
                },
                complete: () => this.loading.set(false),
            });
        });
    }

    get activeIndex() {
        if (!this.activeMovie()) return;
        return this.movies().data.indexOf(this.activeMovie()!);
    }

    ngOnInit() {
        this.activeMovie.set(this.movies().data[0]);
        this.startAutoPlay();
    }

    ngOnDestroy() {
        clearInterval(this.intervalId);
    }

    startAutoPlay() {
        this.intervalId = setInterval(() => {
            if (!this.autoPlay()) return;

            const index = this.activeIndex;
            if (index === undefined) return;

            const nextIndex = (index + 1) % this.movies().data.length;

            this.activeMovie.set(this.movies().data[nextIndex]);
        }, 8000);
    }

    resumeAutoPlay() {
        this.autoPlay.set(true);
    }

    pauseAutoPlay() {
        this.autoPlay.set(false);
    }
}
