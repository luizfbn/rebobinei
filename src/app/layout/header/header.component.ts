import { Component, computed, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchModalService } from '../../features/search/modals/search-modal/search-modal.service';
import { AuthModalService } from '../../features/auth/modals/auth-modal/auth-modal.service';
import { AuthService } from '../../core/auth/services/auth.service';
import { UserMenuComponent } from '../../shared/components/user-menu/user-menu.component';
import { SearchTriggerComponent } from '../../features/search/components/search-trigger/search-trigger.component';

@Component({
    selector: 'app-header',
    imports: [RouterLink, UserMenuComponent, SearchTriggerComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    authService = inject(AuthService);
    searchModalService = inject(SearchModalService);
    authModalService = inject(AuthModalService);

    @ViewChild('searchModal', { read: ViewContainerRef })
    searchModalContainer!: ViewContainerRef;

    openSearchModal() {
        this.searchModalService.open(this.searchModalContainer);
    }

    openAuthModal() {
        this.authModalService.open(this.searchModalContainer);
    }
}
