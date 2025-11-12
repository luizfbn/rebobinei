import { Component, effect, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaCardComponent } from '../../../../shared/components/media-card/media-card.component';
import { PageSelectorComponent } from '../../../../shared/components/page-selector/page-selector.component';
import { pageTransform } from '../../../../shared/utils/transformers';

@Component({
    selector: 'app-search-page',
    imports: [MediaCardComponent, PageSelectorComponent],
    templateUrl: './search-page.component.html',
    styleUrl: './search-page.component.css',
})
export class SearchPageComponent {
    router = inject(Router);
    route = inject(ActivatedRoute);

    query = input<string>();
    page = input.required({
        transform: pageTransform,
    });

    totalPages = 5;

    constructor() {
        effect(() => {
            console.log(`A URL mudou, buscando dados para a página: ${this.page()}`);
        });
    }

    navigateToPage(newPage: number) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { page: newPage },
            queryParamsHandling: 'merge',
        });
    }
}
