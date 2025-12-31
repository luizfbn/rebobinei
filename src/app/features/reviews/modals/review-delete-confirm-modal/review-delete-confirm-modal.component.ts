import { Component, inject } from '@angular/core';
import { ModalRef } from '../../../../shared/modal/modal-ref';

@Component({
    selector: 'app-review-delete-confirm-modal',
    imports: [],
    templateUrl: './review-delete-confirm-modal.component.html',
    styleUrl: './review-delete-confirm-modal.component.css',
})
export class ReviewDeleteConfirmModalComponent {
    modalRef = inject(ModalRef<boolean>);

    close(deleteReview?: boolean) {
        this.modalRef.close(deleteReview ?? false);
    }
}
