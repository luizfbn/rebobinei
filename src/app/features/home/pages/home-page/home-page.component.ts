import { Component } from '@angular/core';
import { PopularMoviesComponent } from '../../components/popular-movies/popular-movies.component';
import { UpcomingMoviesComponent } from '../../components/upcoming-movies/upcoming-movies.component';
import { TrendingMoviesComponent } from '../../components/trending-movies/trending-movies.component';

@Component({
    selector: 'app-home-page',
    imports: [PopularMoviesComponent, UpcomingMoviesComponent, TrendingMoviesComponent],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
