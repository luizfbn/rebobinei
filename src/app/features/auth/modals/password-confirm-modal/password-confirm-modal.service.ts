import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalService } from '../../../../shared/modal/modal.service';
import { PasswordConfirmModalComponent } from './password-confirm-modal.component';

@Injectable({
    providedIn: 'root',
})
export class PasswordConfirmModalService {
    constructor(private modalService: ModalService) {}

    open(viewContainerRef: ViewContainerRef) {
        return this.modalService.open<string, void>({
            viewContainerRef: viewContainerRef,
            contentComponent: PasswordConfirmModalComponent,
        });
    }
}
