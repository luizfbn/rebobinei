import { inject, Injectable, signal } from '@angular/core';
import { forkJoin, switchMap, tap } from 'rxjs';
import { ReviewStats } from '../../../core/review/models/review-stats.model';
import { ReviewWithAuthor } from '../../../core/review/models/review-with-author.model';
import { MovieDetails } from '../../../core/movie/models/movie-details.model';
import { Pagination } from '../../../shared/models/pagination.model';
import { MovieService } from '../../../core/movie/services/movie.service';

@Injectable({
    providedIn: 'root',
})
export class MovieStateService {
    movieService = inject(MovieService);

    movie = signal<MovieDetails | null>(null);
    stats = signal<ReviewStats | null>(null);
    reviews = signal<Pagination<ReviewWithAuthor>>({
        data: [],
        page: 1,
        totalPages: 1,
        totalResults: 0,
    });

    reset() {
        this.movie.set(null);
        this.stats.set(null);
        this.reviews.set({
            data: [],
            page: 1,
            totalPages: 1,
            totalResults: 0,
        });
    }

    loadMovie(movieId: number) {
        return this.movieService.getDetails(movieId).pipe(tap((movie) => this.movie.set(movie)));
    }

    loadStats(movieId: number) {
        return this.movieService.getStats(movieId).pipe(tap((stats) => this.stats.set(stats)));
    }

    loadReviews(...args: Parameters<MovieService['getReviews']>) {
        return this.movieService
            .getReviews(...args)
            .pipe(tap((reviews) => this.reviews.set(reviews)));
    }

    addReview(...args: Parameters<MovieService['addReview']>) {
        const movieId = args[0];
        return this.movieService.addReview(...args).pipe(
            switchMap(() => {
                return forkJoin([this.loadReviews(movieId), this.loadStats(movieId)]);
            })
        );
    }

    deleteReview(...args: Parameters<MovieService['deleteReview']>) {
        const movieId = this.movie()?.tmdbId;
        if (!movieId) return;

        return this.movieService.deleteReview(...args).pipe(
            switchMap(() => {
                return forkJoin([this.loadReviews(movieId), this.loadStats(movieId)]);
            })
        );
    }
}
