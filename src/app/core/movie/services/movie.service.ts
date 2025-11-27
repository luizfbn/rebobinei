import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { environment } from '../../../environments/environment';
import { toHttpParams } from '../../../shared/utils/http-params.util';
import { Pagination, PaginationQueryParams } from '../../../shared/models/pagination.model';
import { MovieListItem } from '../models/movie-list-item.model';
import { MovieDetails } from '../models/movie-details.model';
import { ReviewService } from '../../review/services/review.service';

@Injectable({
    providedIn: 'root',
})
export class MovieService {
    private http = inject(HttpClient);
    private reviewService = inject(ReviewService);
    private baseUrl = `${environment.apiUrl}/movies`;

    list(
        paramsObj: { category?: 'popular' | 'trending' | 'upcoming' } & Omit<
            PaginationQueryParams,
            'limit'
        >
    ) {
        const params = toHttpParams({ ...paramsObj });
        return this.http.get<Pagination<MovieListItem>>(this.baseUrl, { params }).pipe(retry(2));
    }

    search(query: string, paramsObj: Omit<PaginationQueryParams, 'limit'>) {
        const params = toHttpParams({ ...paramsObj, q: query });
        return this.http
            .get<Pagination<MovieListItem>>(`${this.baseUrl}/search`, { params })
            .pipe(retry(2));
    }

    getDetails(id: number) {
        return this.http.get<MovieDetails>(`${this.baseUrl}/${id}`).pipe(retry(2));
    }

    getStats(...args: Parameters<ReviewService['getStatsByMovie']>) {
        return this.reviewService.getStatsByMovie(...args);
    }

    getReviews(...args: Parameters<ReviewService['listByMovie']>) {
        return this.reviewService.listByMovie(...args);
    }

    addReview(...args: Parameters<ReviewService['create']>) {
        return this.reviewService.create(...args);
    }
}
