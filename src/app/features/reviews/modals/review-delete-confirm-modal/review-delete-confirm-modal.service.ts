import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalService } from '../../../../shared/modal/modal.service';
import { ReviewDeleteConfirmModalComponent } from './review-delete-confirm-modal.component';

@Injectable({
    providedIn: 'root',
})
export class ReviewDeleteConfirmModalService {
    constructor(private modalService: ModalService) {}

    open(viewContainerRef: ViewContainerRef) {
        return this.modalService.open<boolean, void>({
            viewContainerRef: viewContainerRef,
            contentComponent: ReviewDeleteConfirmModalComponent,
        });
    }
}
