import { Component, output } from '@angular/core';

@Component({
    selector: 'app-delete-confirm-step',
    imports: [],
    templateUrl: './delete-confirm-step.component.html',
    styleUrl: './delete-confirm-step.component.css',
})
export class DeleteConfirmStepComponent {
    confirm = output<void>();
    cancel = output<void>();
}
