import { Component, effect, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
    selector: 'app-settings-page',
    imports: [RouterLink, RouterLinkActive, RouterOutlet],
    templateUrl: './settings-page.component.html',
    styleUrl: './settings-page.component.css',
})
export class SettingsPageComponent {
    authService = inject(AuthService);
    router = inject(Router);

    constructor() {
        effect(() => {
            if (!this.authService.isAuthenticated()) {
                this.router.navigate(['/']);
            }
        });
    }
}
