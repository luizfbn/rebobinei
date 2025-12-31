import { Component, inject, signal } from '@angular/core';
import { PasswordFormComponent } from '../../components/password-form/password-form.component';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { PasswordForm } from '../../models/password-form.model';
import { Alert } from '../../../../shared/models/alert.model';
import { UserService } from '../../../../core/user/services/user.service';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
    selector: 'app-password-settings-page',
    imports: [PasswordFormComponent, AlertComponent],
    templateUrl: './password-settings-page.component.html',
    styleUrl: './password-settings-page.component.css',
})
export class PasswordSettingsPageComponent {
    userService = inject(UserService);
    authService = inject(AuthService);

    loading = signal(false);
    alert = signal<Alert>({
        type: 'error',
        message: 'Ocorreu um erro.',
        show: false,
    });

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
                    this.alert.set({ type: 'error', message: err.error?.message, show: true });
                },
                complete: () => {
                    this.loading.set(false);
                },
            });
    }
}
