import { Component, HostListener, output } from '@angular/core';

@Component({
    selector: 'app-base-modal',
    imports: [],
    templateUrl: './base-modal.component.html',
    styleUrl: './base-modal.component.css',
})
export class BaseModalComponent {
    onClose = output<void>();

    @HostListener('document:keydown.escape')
    close() {
        this.onClose.emit();
    }
}
