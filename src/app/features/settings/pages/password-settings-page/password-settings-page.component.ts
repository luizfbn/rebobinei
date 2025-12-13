import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordFormComponent } from '../../components/password-form/password-form.component';
import { PasswordForm } from '../../models/password-form.model';
import { UserService } from '../../../../core/user/services/user.service';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
    selector: 'app-password-settings-page',
    imports: [PasswordFormComponent],
    templateUrl: './password-settings-page.component.html',
    styleUrl: './password-settings-page.component.css',
})
export class PasswordSettingsPageComponent {
    userService = inject(UserService);
    authService = inject(AuthService);
    router = inject(Router);

    loading = signal(false);

    onChangePassword(credentials: PasswordForm) {
        this.userService
            .changePassword({
                currentPassword: credentials.currentPassword,
                newPassword: credentials.newPassword,
                passwordConfirmation: credentials.passwordConfirmation,
            })
            .subscribe({
                next: () => this.authService.logout().subscribe(),
                error: (err) => {
                    this.loading.set(false);
                    console.error(err);
                },
                complete: () => {
                    this.loading.set(false);
                    this.router.navigate(['/']);
                },
            });
    }
}
