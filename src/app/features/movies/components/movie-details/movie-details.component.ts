import { Component, input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MovieDetails } from '../../models/movie-details.model';
import { MinutesToHoursPipe } from '../../../../shared/pipes/minutes-to-hours.pipe';

@Component({
    selector: 'app-movie-details',
    imports: [CurrencyPipe, DatePipe, MinutesToHoursPipe],
    templateUrl: './movie-details.component.html',
    styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
    movie = input.required<MovieDetails>();
}
