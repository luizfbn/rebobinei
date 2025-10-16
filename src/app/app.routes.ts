import { Routes } from '@angular/router';
import { SearchPageComponent } from './features/search/pages/search-page/search-page.component';
import { ProfilePageComponent } from './features/profile/pages/profile-page/profile-page.component';

export const routes: Routes = [
    {
        path: 'search',
        component: SearchPageComponent,
    },
    {
        path: 'profile',
        component: ProfilePageComponent,
    },
];
