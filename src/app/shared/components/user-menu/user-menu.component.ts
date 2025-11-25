import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { User } from '../../../core/user/models/user.model';

@Component({
    selector: 'app-user-menu',
    imports: [RouterLink],
    templateUrl: './user-menu.component.html',
    styleUrl: './user-menu.component.css',
})
export class UserMenuComponent {
    authService = inject(AuthService);

    user = input.required<User>();
    dropdownOpen = signal(false);

    logout() {
        this.authService.logout().subscribe();
    }
}
