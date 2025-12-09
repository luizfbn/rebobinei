import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModalComponent } from '../../../../shared/modal/base-modal/base-modal.component';
import { DeleteConfirmStepComponent } from '../../components/delete-confirm-step/delete-confirm-step.component';
import { PasswordConfirmFormComponent } from '../../../auth/components/password-confirm-form/password-confirm-form.component';

@Component({
    selector: 'app-delete-account-modal',
    imports: [BaseModalComponent, DeleteConfirmStepComponent, PasswordConfirmFormComponent],
    templateUrl: './delete-account-modal.component.html',
    styleUrl: './delete-account-modal.component.css',
})
export class DeleteAccountModalComponent {
    router = inject(Router);
    route = inject(ActivatedRoute);
    step = signal(1);
    isDeleting = signal(false);

    closeModal() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    confirmDelete(password: string) {
        console.log('Excluir conta', password);
        this.isDeleting.set(true);
        this.closeModal();
    }
}
