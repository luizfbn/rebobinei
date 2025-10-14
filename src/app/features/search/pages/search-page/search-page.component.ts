import { Component, input } from '@angular/core';
import { MediaCardComponent } from '../../../../shared/components/media-card/media-card.component';

@Component({
    selector: 'app-search-page',
    imports: [MediaCardComponent],
    templateUrl: './search-page.component.html',
    styleUrl: './search-page.component.css',
})
export class SearchPageComponent {
    query = input<string>();
    page = input.required({
        transform: (page: number | undefined) => page ?? 1,
    });
}
