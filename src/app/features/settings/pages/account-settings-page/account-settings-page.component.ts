import { Component } from '@angular/core';
import { AccountFormComponent } from '../../components/account-form/account-form.component';

@Component({
    selector: 'app-account-settings-page',
    imports: [AccountFormComponent],
    templateUrl: './account-settings-page.component.html',
    styleUrl: './account-settings-page.component.css',
})
export class AccountSettingsPageComponent {
    onChangeAccount(credentials: any /* AccountCredentials */) {
        console.log('Novos dados', credentials);
    }
}
