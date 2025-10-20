import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-settings-page',
    imports: [RouterLink, RouterLinkActive, RouterOutlet],
    templateUrl: './settings-page.component.html',
    styleUrl: './settings-page.component.css',
})
export class SettingsPageComponent {}
