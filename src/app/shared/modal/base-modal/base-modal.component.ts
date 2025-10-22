import {
    AfterViewInit,
    Component,
    Injector,
    input,
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
export class BaseModalComponent implements AfterViewInit {
    onClose = output<void>();
    contentComponent = input<Type<unknown>>();
    contentInjector = input<Injector>();
    isMouseDownOnOverlay = false;

    @ViewChild('contentHost', { read: ViewContainerRef, static: true })
    contentHost!: ViewContainerRef;

    ngAfterViewInit() {
        const component = this.contentComponent();
        const injector = this.contentInjector();

        if (component && injector) {
            this.loadComponent(component, injector);
        }
    }

    loadComponent(componentType: Type<unknown>, injector: Injector) {
        this.contentHost.clear();
        this.contentHost.createComponent(componentType, { injector });
    }

    onOverlayMouseDown(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            this.isMouseDownOnOverlay = true;
        }
    }

    onOverlayMouseUp(event: MouseEvent) {
        if (this.isMouseDownOnOverlay && event.target === event.currentTarget) {
            this.close();
        }
        this.isMouseDownOnOverlay = false;
    }

    close() {
        this.onClose.emit();
    }
}
