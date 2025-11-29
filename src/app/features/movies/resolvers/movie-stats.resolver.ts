import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ReviewStats } from '../../../core/review/models/review-stats.model';
import { MovieStateService } from '../services/movie-state.service';

export const movieStatsResolver: ResolveFn<ReviewStats> = (route, state) => {
    const movieStateService = inject(MovieStateService);
    const movieId = route.paramMap.get('id')!;
    return movieStateService.loadStats(parseInt(movieId, 10));
};
