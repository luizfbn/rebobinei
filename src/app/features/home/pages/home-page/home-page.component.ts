import { Component } from '@angular/core';
import { PopularMoviesComponent } from '../../components/popular-movies/popular-movies.component';

@Component({
    selector: 'app-home-page',
    imports: [PopularMoviesComponent],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
