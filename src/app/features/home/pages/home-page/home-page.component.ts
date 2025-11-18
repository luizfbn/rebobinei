import { Component } from '@angular/core';
import { PopularMoviesComponent } from '../../components/popular-movies/popular-movies.component';
import { UpcomingMoviesComponent } from '../../components/upcoming-movies/upcoming-movies.component';

@Component({
    selector: 'app-home-page',
    imports: [PopularMoviesComponent, UpcomingMoviesComponent],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
