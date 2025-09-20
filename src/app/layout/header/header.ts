import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchModal } from '../../modals/search-modal/search-modal';

@Component({
    selector: 'app-header',
    imports: [RouterLink, SearchModal],
    templateUrl: './header.html',
    styleUrl: './header.css',
})
export class Header {
    isSearching = false;
}
