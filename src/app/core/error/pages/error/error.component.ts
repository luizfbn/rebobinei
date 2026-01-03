import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorState } from '../../models/error-state.model';

@Component({
    selector: 'app-error',
    imports: [],
    templateUrl: './error.component.html',
    styleUrl: './error.component.css',
})
export class ErrorComponent implements OnInit {
    location = inject(Location);
    router = inject(Router);

    error = signal<ErrorState | null>(null);
    errorMessage = computed(() => {
        const err = this.error();
        return err ? `Erro ${err.status}: ${err.message}` : 'Erro desconhecido';
    });

    ngOnInit() {
        const navState = this.location.getState() as {
            errorDetails?: ErrorState;
        };
        const errorDetails = navState?.errorDetails;

        if (!errorDetails) {
            this.router.navigate(['/'], { replaceUrl: true });
            return;
        }

        this.error.set(errorDetails);
    }

    goHome() {
        this.router.navigate(['/']);
    }
}
