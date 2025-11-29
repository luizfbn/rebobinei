import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MovieDetails } from '../../../core/movie/models/movie-details.model';
import { MovieStateService } from '../services/movie-state.service';

export const movieDetailsResolver: ResolveFn<MovieDetails> = (route, state) => {
    const movieStateService = inject(MovieStateService);
    const movieId = route.paramMap.get('id')!;
    movieStateService.reset();
    return movieStateService.loadMovie(parseInt(movieId, 10));
};
