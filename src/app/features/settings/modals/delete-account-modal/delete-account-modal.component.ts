import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModalComponent } from '../../../../shared/modal/base-modal/base-modal.component';
import { DeleteConfirmStepComponent } from '../../components/delete-confirm-step/delete-confirm-step.component';
import { PasswordConfirmFormComponent } from '../../../auth/components/password-confirm-form/password-confirm-form.component';
import { UserService } from '../../../../core/user/services/user.service';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
    selector: 'app-delete-account-modal',
    imports: [BaseModalComponent, DeleteConfirmStepComponent, PasswordConfirmFormComponent],
    templateUrl: './delete-account-modal.component.html',
    styleUrl: './delete-account-modal.component.css',
})
export class DeleteAccountModalComponent {
    userService = inject(UserService);
    authService = inject(AuthService);
    router = inject(Router);
    route = inject(ActivatedRoute);

    step = signal(1);
    isDeleting = signal(false);

    closeModal() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    confirmDelete(password: string) {
        this.isDeleting.set(true);
        this.userService.deleteMe(password).subscribe({
            next: () => this.authService.currentUser.set(null),
            error: (err) => {
                this.isDeleting.set(false);
                console.error(err);
            },
            complete: () => {
                this.isDeleting.set(false);
                this.router.navigate(['/']);
            },
        });
    }
}
