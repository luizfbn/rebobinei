import { Routes } from '@angular/router';
import { SearchPageComponent } from './features/search/pages/search-page/search-page.component';
import { ProfilePageComponent } from './features/profile/pages/profile-page/profile-page.component';
import { SettingsPageComponent } from './features/settings/pages/settings-page/settings-page.component';

export const routes: Routes = [
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
    },
];
