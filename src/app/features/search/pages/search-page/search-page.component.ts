import { Component, input } from '@angular/core';
import { pageTransform } from '../../../../shared/utils/transformers.util';
import { SearchListComponent } from '../../components/search-list/search-list.component';

@Component({
    selector: 'app-search-page',
    imports: [SearchListComponent],
    templateUrl: './search-page.component.html',
    styleUrl: './search-page.component.css',
})
export class SearchPageComponent {
    query = input.required<string>({
        alias: 'q',
    });
    page = input.required({
        transform: pageTransform,
    });
}
