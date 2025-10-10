import { Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchModalService } from '../../features/search/modals/search-modal/search-modal.service';
import { AuthModalService } from '../../features/auth/modals/auth-modal/auth-modal.service';
import { UserMenuComponent } from '../../shared/components/user-menu/user-menu.component';

@Component({
    selector: 'app-header',
    imports: [RouterLink, UserMenuComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    isLoggedIn = true;
    searchModalService = inject(SearchModalService);
    authModalService = inject(AuthModalService);

    @ViewChild('searchModal', { read: ViewContainerRef })
    searchModalContainer!: ViewContainerRef;

    openSearchModal() {
        const modalRef = this.searchModalService.open(this.searchModalContainer);
        modalRef.afterClosed.subscribe((result) => {
            console.log('Search modal closed', result);
        });
    }

    openAuthModal() {
        const modalRef = this.authModalService.open(this.searchModalContainer);
        modalRef.afterClosed.subscribe((result) => {
            console.log('Auth modal closed', result);
        });
    }
}
