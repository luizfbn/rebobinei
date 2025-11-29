import { Component, inject, input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MinutesToHoursPipe } from '../../../../shared/pipes/minutes-to-hours.pipe';
import { MovieStateService } from '../../services/movie-state.service';

@Component({
    selector: 'app-movie-details',
    imports: [CurrencyPipe, DatePipe, MinutesToHoursPipe],
    templateUrl: './movie-details.component.html',
    styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
    movieStateService = inject(MovieStateService);
}
