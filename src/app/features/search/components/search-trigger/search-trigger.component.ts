import { Component, output } from '@angular/core';

@Component({
    selector: 'app-search-trigger',
    imports: [],
    templateUrl: './search-trigger.component.html',
    styleUrl: './search-trigger.component.css',
})
export class SearchTriggerComponent {
    onClick = output();

    click() {
        this.onClick.emit();
    }
}
