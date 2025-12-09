import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { MoviePageComponent } from './features/movies/pages/movie-page/movie-page.component';
import { SearchPageComponent } from './features/search/pages/search-page/search-page.component';
import { ProfilePageComponent } from './features/profile/pages/profile-page/profile-page.component';
import { SettingsPageComponent } from './features/settings/pages/settings-page/settings-page.component';
import { AccountSettingsPageComponent } from './features/settings/pages/account-settings-page/account-settings-page.component';
import { PasswordSettingsPageComponent } from './features/settings/pages/password-settings-page/password-settings-page.component';
import { DeleteAccountModalComponent } from './features/settings/modals/delete-account-modal/delete-account-modal.component';
import { ReviewDetailModalComponent } from './features/reviews/modals/review-detail-modal/review-detail-modal.component';
import { movieDetailsResolver } from './features/movies/resolvers/movie-details.resolver';
import { movieStatsResolver } from './features/movies/resolvers/movie-stats.resolver';
import { reviewDetailsResolver } from './features/reviews/resolvers/review-details.resolver';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
    },
    {
        path: 'movies/:id',
        component: MoviePageComponent,
        resolve: {
            movie: movieDetailsResolver,
            reviewStats: movieStatsResolver,
        },
        children: [
            {
                path: 'reviews/:id',
                component: ReviewDetailModalComponent,
                resolve: {
                    review: reviewDetailsResolver,
                },
            },
        ],
    },
    {
        path: 'search',
        component: SearchPageComponent,
    },
    {
        path: 'profile/:id',
        component: ProfilePageComponent,
        children: [
            {
                path: 'reviews/:id',
                component: ReviewDetailModalComponent,
                resolve: {
                    review: reviewDetailsResolver,
                },
            },
        ],
    },
    {
        path: 'settings',
        component: SettingsPageComponent,
        children: [
            { path: '', redirectTo: 'account', pathMatch: 'full' },
            { path: 'account', component: AccountSettingsPageComponent },
            { path: 'password', component: PasswordSettingsPageComponent },
            { path: 'delete', component: DeleteAccountModalComponent },
        ],
    },
    { path: '**', component: HomePageComponent },
];
