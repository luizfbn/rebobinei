import { Component, inject, output, signal } from '@angular/core';
import { PasswordConfirmFormComponent } from '../../components/password-confirm-form/password-confirm-form.component';
import { ModalRef } from '../../../../shared/modal/modal-ref';

@Component({
    selector: 'app-password-confirm-modal',
    imports: [PasswordConfirmFormComponent],
    templateUrl: './password-confirm-modal.component.html',
    styleUrl: './password-confirm-modal.component.css',
    host: {
        class: 'contents',
    },
})
export class PasswordConfirmModalComponent {
    modalRef = inject(ModalRef<string>);

    submitPassword = output<string>();

    close(password?: string) {
        this.modalRef.close(password);
    }
}
