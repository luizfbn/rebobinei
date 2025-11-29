import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs';
import { environment } from '../../../environments/environment';
import { toHttpParams } from '../../../shared/utils/http-params.util';
import { Pagination, PaginationQueryParams } from '../../../shared/models/pagination.model';
import { ReviewStats } from '../models/review-stats.model';
import { ReviewDetails } from '../models/review-details.model';
import { ReviewWithAuthor } from '../models/review-with-author.model';
import { ReviewWithMovie } from '../models/review-with-movie.model';
import { Rating } from '../models/rating.model';
import { SortBy } from '../enums/sort-by.enum';

@Injectable({
    providedIn: 'root',
})
export class ReviewService {
    private http = inject(HttpClient);
    private baseUrl = environment.apiUrl;

    getDetails(id: string) {
        return this.http.get<ReviewDetails>(`${this.baseUrl}/reviews/${id}`).pipe(retry(2));
    }

    getByUserAndMovie(userId: string, movieId: number) {
        return this.http
            .get<ReviewDetails | null>(`${this.baseUrl}/reviews/by-user-and-movie`, {
                params: { userId, movieId },
            })
            .pipe(retry(2));
    }

    getStatsByMovie(movieId: number) {
        return this.http.get<ReviewStats>(`${this.baseUrl}/movies/${movieId}/stats`).pipe(retry(2));
    }

    list(paramsObj?: { sort?: SortBy; rating?: Rating } & PaginationQueryParams) {
        const params = toHttpParams({ ...paramsObj });
        return this.http
            .get<Pagination<ReviewDetails>>(`${this.baseUrl}/reviews`, { params })
            .pipe(retry(2));
    }

    listByMovie(
        movieId: number,
        paramsObj?: { sort?: SortBy; rating?: Rating } & PaginationQueryParams
    ) {
        const params = toHttpParams({ ...paramsObj });
        return this.http
            .get<Pagination<ReviewWithAuthor>>(`${this.baseUrl}/movies/${movieId}/reviews`, {
                params,
            })
            .pipe(retry(2));
    }

    listByUser(
        userId: string,
        paramsObj?: { sort?: SortBy; rating?: Rating } & PaginationQueryParams
    ) {
        const params = toHttpParams({ ...paramsObj });
        return this.http
            .get<Pagination<ReviewWithMovie>>(`${this.baseUrl}/users/${userId}/reviews`, { params })
            .pipe(retry(2));
    }

    listByCurrentUser(paramsObj?: { sort?: SortBy; rating?: Rating } & PaginationQueryParams) {
        const params = toHttpParams({ ...paramsObj });
        return this.http
            .get<Pagination<ReviewWithMovie>>(`${this.baseUrl}/users/me/reviews`, {
                params,
            })
            .pipe(retry(2));
    }

    create(movieId: number, data: { rating: Rating; comment?: string }) {
        return this.http.post<void>(`${this.baseUrl}/movies/${movieId}/reviews`, data);
    }

    delete(id: string) {
        return this.http.delete<void>(`${this.baseUrl}/reviews/${id}`);
    }
}
