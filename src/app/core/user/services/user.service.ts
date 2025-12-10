import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Profile } from '../models/profile.model';
import { ReviewService } from '../../review/services/review.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private http = inject(HttpClient);
    private reviewService = inject(ReviewService);
    private baseUrl = `${environment.apiUrl}/users`;

    create(data: { name: string; username: string; email: string; password: string }) {
        return this.http.post<void>(this.baseUrl, data);
    }

    deleteMe(password: string) {
        return this.http.delete<void>(`${this.baseUrl}/me`, { body: { password } });
    }

    getProfile(id: string) {
        return this.http.get<Profile>(`${this.baseUrl}/${id}`).pipe(retry(2));
    }

    updateProfile(data: { name?: string; username?: string }) {
        return this.http.patch<Profile>(`${this.baseUrl}/me`, data);
    }

    changeEmail(data: { email: string; password: string }) {
        return this.http.patch<void>(`${this.baseUrl}/me/email`, data);
    }

    changePassword(data: {
        currentPassword: string;
        newPassword: string;
        passwordConfirmation: string;
    }) {
        return this.http.patch<void>(`${this.baseUrl}/me/password`, data);
    }

    listMyReviews(...args: Parameters<ReviewService['listByCurrentUser']>) {
        return this.reviewService.listByCurrentUser(...args);
    }

    listUserReviews(...args: Parameters<ReviewService['listByUser']>) {
        return this.reviewService.listByUser(...args);
    }
}
