import { Injectable, Injector, Type, ViewContainerRef } from '@angular/core';
import { ModalRef } from './modal-ref';
import { BaseModalComponent } from './base-modal/base-modal.component';
import { MODAL_DATA } from './modal.tokens';

export interface ModalConfig<D = unknown> {
    viewContainerRef: ViewContainerRef;
    contentComponent: Type<unknown>;
    data?: D;
}

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    open<R = unknown, D = unknown>(config: ModalConfig<D>): ModalRef<R> {
        const { viewContainerRef, contentComponent, data } = config;

        const modalRef = new ModalRef<R>();

        const injector = Injector.create({
            providers: [
                { provide: ModalRef, useValue: modalRef },
                { provide: MODAL_DATA, useValue: data },
            ],
        });

        viewContainerRef.clear();

        const baseModalRef = viewContainerRef.createComponent(BaseModalComponent);

        baseModalRef.instance.loadComponent(contentComponent, injector);

        baseModalRef.instance.onClose.subscribe(() => modalRef.close());

        const sub = modalRef.afterClosed.subscribe(() => {
            baseModalRef.destroy();
            sub.unsubscribe();
        });

        return modalRef;
    }
}
