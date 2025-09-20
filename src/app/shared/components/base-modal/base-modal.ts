import { Component, HostListener, output } from '@angular/core';

@Component({
    selector: 'app-base-modal',
    imports: [],
    templateUrl: './base-modal.html',
    styleUrl: './base-modal.css',
})
export class BaseModal {
    onClose = output<void>();

    @HostListener('document:keydown.escape')
    close() {
        this.onClose.emit();
    }
}
