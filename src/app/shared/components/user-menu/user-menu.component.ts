import { Component } from '@angular/core';

@Component({
    selector: 'app-user-menu',
    imports: [],
    templateUrl: './user-menu.component.html',
    styleUrl: './user-menu.component.css',
})
export class UserMenuComponent {
    dropdownOpen = false;

    setDropdownOpen(isOpen: boolean) {
        this.dropdownOpen = isOpen;
    }
}
