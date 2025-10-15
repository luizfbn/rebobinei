import { Component, effect, inject, input } from '@angular/core';
import { MediaCardComponent } from '../../../../shared/components/media-card/media-card.component';
import { PageSelectorComponent } from '../../../../shared/components/page-selector/page-selector.component';
import { ActivatedRoute, Router } from '@angular/router';

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
        transform: (page: number | undefined) => Number(page) ?? 1,
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
