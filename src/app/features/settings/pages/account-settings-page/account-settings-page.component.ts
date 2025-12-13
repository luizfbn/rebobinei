import { Component, inject, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { filter, finalize, of, switchMap, tap } from 'rxjs';
import { AccountFormComponent } from '../../components/account-form/account-form.component';
import { AccountForm } from '../../models/account-form.model';
import { UserService } from '../../../../core/user/services/user.service';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { PasswordConfirmModalService } from '../../../auth/modals/password-confirm-modal/password-confirm-modal.service';

@Component({
    selector: 'app-account-settings-page',
    imports: [AccountFormComponent],
    templateUrl: './account-settings-page.component.html',
    styleUrl: './account-settings-page.component.css',
})
export class AccountSettingsPageComponent {
    userService = inject(UserService);
    authService = inject(AuthService);
    passwordConfirmModalService = inject(PasswordConfirmModalService);

    @ViewChild('passwordConfirmModal', { read: ViewContainerRef })
    passwordConfirmModalContainer!: ViewContainerRef;

    loading = signal(false);

    onChangeAccount(credentials: AccountForm) {
        const currentUserData = {
            name: this.authService.currentUser()!.name,
            username: this.authService.currentUser()!.username,
            email: this.authService.currentUser()!.email,
        };
        const payload = this.getChanges(currentUserData, credentials);

        const needsProfileUpdate = !!(payload.name || payload.username);
        const needsEmailUpdate = !!payload.email;

        if (!needsProfileUpdate && !needsEmailUpdate) return;

        if (needsProfileUpdate && !needsEmailUpdate) {
            this.loading.set(true);
            this.userService
                .updateProfile({
                    name: payload.name,
                    username: payload.username,
                })
                .subscribe({
                    next: () => this.authService.loadUser().subscribe(),
                    error: (err) => {
                        this.loading.set(false);
                        console.error(err);
                    },
                    complete: () => this.loading.set(false),
                });
            return;
        }

        const passwordModal = this.passwordConfirmModalService.open(
            this.passwordConfirmModalContainer
        );

        passwordModal.afterClosed
            .pipe(
                filter((password): password is string => !!password),
                tap(() => this.loading.set(true)),
                switchMap((password) =>
                    this.userService.changeEmail({ newEmail: payload.email!, password })
                ),
                switchMap(() =>
                    needsProfileUpdate
                        ? this.userService.updateProfile({
                              name: payload.name,
                              username: payload.username,
                          })
                        : of(null)
                ),
                finalize(() => this.loading.set(false))
            )
            .subscribe({
                next: () => this.authService.loadUser().subscribe(),
                error: (err) => console.error(err),
            });
    }

    getChanges(original: AccountForm, current: AccountForm) {
        const changed: Partial<AccountForm> = {};

        for (const key of Object.keys(current) as (keyof AccountForm)[]) {
            if (current[key] !== original[key]) {
                changed[key] = current[key];
            }
        }

        return changed;
    }
}
