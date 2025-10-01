import {
    Component,
    HostListener,
    Injector,
    output,
    Type,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';

@Component({
    selector: 'app-base-modal',
    imports: [],
    templateUrl: './base-modal.component.html',
    styleUrl: './base-modal.component.css',
})
export class BaseModalComponent {
    onClose = output<void>();

    @ViewChild('contentHost', { read: ViewContainerRef, static: true })
    contentHost!: ViewContainerRef;

    loadComponent(componentType: Type<unknown>, injector: Injector) {
        this.contentHost.clear();
        this.contentHost.createComponent(componentType, { injector });
    }

    @HostListener('document:keydown.escape')
    close() {
        this.onClose.emit();
    }
}
