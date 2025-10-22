import { Component } from '@angular/core';
import { PasswordFormComponent } from '../../components/password-form/password-form.component';

@Component({
    selector: 'app-password-settings-page',
    imports: [PasswordFormComponent],
    templateUrl: './password-settings-page.component.html',
    styleUrl: './password-settings-page.component.css',
})
export class PasswordSettingsPageComponent {
    onChangePassword(credentials: any /* PasswordCredentials */) {
        console.log('Novos dados', credentials);
    }
}
