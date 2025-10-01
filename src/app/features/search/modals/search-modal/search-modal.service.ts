import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalService } from '../../../../shared/modal/modal.service';
import { SearchModalConfig } from './search-modal.types';
import { SearchModalComponent } from './search-modal.component';

@Injectable({
    providedIn: 'root',
})
export class SearchModalService {
    constructor(private modalService: ModalService) {}

    open(viewContainerRef: ViewContainerRef, config?: SearchModalConfig) {
        return this.modalService.open<void, SearchModalConfig>({
            viewContainerRef: viewContainerRef,
            contentComponent: SearchModalComponent,
            data: config,
        });
    }
}
