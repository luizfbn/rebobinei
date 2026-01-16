import { Component, effect, ElementRef, inject, Renderer2, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
    selector: 'app-user-menu',
    imports: [RouterLink],
    templateUrl: './user-menu.component.html',
    styleUrl: './user-menu.component.css',
})
export class UserMenuComponent {
    authService = inject(AuthService);

    dropdownOpen = signal(false);

    elementRef = inject(ElementRef);
    renderer = inject(Renderer2);

    constructor() {
        effect((onCleanup) => {
            if (this.dropdownOpen()) {
                const removeListener = this.renderer.listen('document', 'click', (event: Event) => {
                    if (!this.elementRef.nativeElement.contains(event.target)) {
                        this.dropdownOpen.set(false);
                    }
                });

                onCleanup(() => {
                    removeListener();
                });
            }
        });
    }

    logout() {
        this.authService.logout().subscribe();
    }

    toggleDropdown(event: Event) {
        event.stopPropagation();
        this.dropdownOpen.update((value) => !value);
    }
}
