import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchModalComponent } from '../../modals/search-modal/search-modal.component';

@Component({
    selector: 'app-header',
    imports: [RouterLink, SearchModalComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    isSearching = false;
}
