import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../user/models/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);
    private baseUrl = `${environment.apiUrl}/auth`;

    currentUser = signal<User | null>(null);

    login(email: string, password: string) {
        return this.http
            .post<{ message: string }>(`${this.baseUrl}/login`, { email, password })
            .pipe(switchMap(() => this.loadUser()));
    }

    logout() {
        return this.http
            .post<{ message: string }>(`${this.baseUrl}/logout`, null)
            .pipe(tap(() => this.currentUser.set(null)));
    }

    loadUser() {
        return this.http.get<User>(`${this.baseUrl}/me`).pipe(
            tap({
                next: (user) => this.currentUser.set(user),
                error: () => this.currentUser.set(null),
            })
        );
    }

    isAuthenticated() {
        return this.currentUser() !== null;
    }
}
