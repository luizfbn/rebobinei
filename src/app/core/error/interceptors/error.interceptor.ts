import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status >= 400 && error.status < 500) {
                return throwError(() => error);
            }

            console.error(`Server error: ${error.status} - ${error.message}`);

            return throwError(() => error);
        })
    );
};
