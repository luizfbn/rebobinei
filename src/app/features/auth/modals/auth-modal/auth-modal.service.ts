import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalService } from '../../../../shared/modal/modal.service';
import { AuthModalComponent } from './auth-modal.component';

@Injectable({
    providedIn: 'root',
})
export class AuthModalService {
    constructor(private modalService: ModalService) {}

    open(viewContainerRef: ViewContainerRef) {
        return this.modalService.open<void, void>({
            viewContainerRef: viewContainerRef,
            contentComponent: AuthModalComponent,
        });
    }
}
