import { Component, input, output } from '@angular/core';
import { AlertType } from '../../models/alert.model';

@Component({
    selector: 'app-alert',
    imports: [],
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.css',
})
export class AlertComponent {
    type = input.required<AlertType>();
    message = input.required<string>();
    dismissible = input(true);
    dismissed = output();

    close() {
        this.dismissed.emit();
    }
}
