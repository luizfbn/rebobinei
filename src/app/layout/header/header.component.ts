import { Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchModalService } from '../../features/search/modals/search-modal/search-modal.service';

@Component({
    selector: 'app-header',
    imports: [RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    searchModalService = inject(SearchModalService);

    @ViewChild('searchModal', { read: ViewContainerRef })
    searchModalContainer!: ViewContainerRef;

    openSearchModal() {
        const modalRef = this.searchModalService.open(this.searchModalContainer);
        modalRef.afterClosed.subscribe((result) => {
            console.log('Search modal closed', result);
        });
    }
}
