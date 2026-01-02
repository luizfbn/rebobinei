import {
    ApplicationConfig,
    ErrorHandler,
    inject,
    provideAppInitializer,
    provideBrowserGlobalErrorListeners,
    provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/auth/interceptors/auth.interceptor';
import { errorInterceptor } from './core/error/interceptors/error.interceptor';
import { GlobalErrorHandler } from './core/error/global-error-handler';
import { ScrollStrategyService } from './core/scroll/services/scroll-strategy.service';
import { AuthService } from './core/auth/services/auth.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(
            routes,
            withComponentInputBinding(),
            withInMemoryScrolling({
                scrollPositionRestoration: 'disabled',
                anchorScrolling: 'enabled',
            })
        ),
        provideHttpClient(withFetch(), withInterceptors([authInterceptor, errorInterceptor])),
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        provideAppInitializer(() => {
            inject(ScrollStrategyService);
            return inject(AuthService).loadUser();
        }),
    ],
};
