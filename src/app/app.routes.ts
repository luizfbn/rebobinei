import { Routes } from '@angular/router';
import { MoviePageComponent } from './features/movies/pages/movie-page/movie-page.component';
import { SearchPageComponent } from './features/search/pages/search-page/search-page.component';
import { ProfilePageComponent } from './features/profile/pages/profile-page/profile-page.component';
import { SettingsPageComponent } from './features/settings/pages/settings-page/settings-page.component';
import { AccountSettingsPageComponent } from './features/settings/pages/account-settings-page/account-settings-page.component';
import { PasswordSettingsPageComponent } from './features/settings/pages/password-settings-page/password-settings-page.component';
import { DeleteAccountModalComponent } from './features/settings/modals/delete-account-modal/delete-account-modal.component';

export const routes: Routes = [
    {
        path: 'movie/:id',
        component: MoviePageComponent,
    },
    {
        path: 'search',
        component: SearchPageComponent,
    },
    {
        path: 'profile/:id',
        component: ProfilePageComponent,
    },
    {
        path: 'settings',
        component: SettingsPageComponent,
        children: [
            { path: '', redirectTo: 'account', pathMatch: 'full' },
            { path: 'account', component: AccountSettingsPageComponent },
            { path: 'password', component: PasswordSettingsPageComponent },
        ],
    },
    {
        path: 'settings/delete',
        component: DeleteAccountModalComponent,
        outlet: 'modal',
    },
];
