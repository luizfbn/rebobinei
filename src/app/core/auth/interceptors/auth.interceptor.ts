import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const reqWithCredentials = req.clone({
        credentials: 'include',
    });

    return next(reqWithCredentials);
};
