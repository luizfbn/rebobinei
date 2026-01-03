import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationError, Router } from '@angular/router';
import { ErrorState } from './models/error-state.model';

export const navigationErrorHandler = (error: NavigationError) => {
    const router = inject(Router);

    if (router.url.startsWith('/error') || router.url.startsWith('/not-found')) {
        return;
    }

    const actualError = error?.error || error;

    if (actualError instanceof HttpErrorResponse) {
        if (actualError.status === 404) {
            router.navigate(['/not-found']);
            return;
        }
        const safeErrorState: ErrorState = {
            message: actualError.error?.message || actualError.message || 'Erro de comunicação',
            status: actualError.status || 500,
        };
        router.navigate(['/error'], { state: { errorDetails: safeErrorState } });
        return;
    }

    const safeErrorState: ErrorState = {
        message: actualError.message || 'Erro inesperado',
        status: 500,
    };

    router.navigate(['/error'], { state: { errorDetails: safeErrorState } });
};
