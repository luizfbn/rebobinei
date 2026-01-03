import { ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

export class GlobalErrorHandler implements ErrorHandler {
    handleError(error: unknown) {
        const timestamp = new Date().toISOString();
        let message = 'Ocorreu um erro inesperado.';

        if (error instanceof HttpErrorResponse) {
            message = `Erro de HTTP ${error.status}: ${error.message}`;
            console.error(`[${timestamp}] HTTP Error:`, error);
        } else if (error instanceof Error) {
            message = error.message;
            console.error(`[${timestamp}] Application Error:`, error.stack);
        } else {
            console.error(`[${timestamp}] Unknown Error:`, error);
        }
    }
}
