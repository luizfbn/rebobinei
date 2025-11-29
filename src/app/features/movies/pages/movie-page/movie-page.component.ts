import { Component, input, numberAttribute } from '@angular/core';
import { MovieDetailsComponent } from '../../components/movie-details/movie-details.component';
import { CastMembersComponent } from '../../components/cast-members/cast-members.component';
import { MovieReviewsComponent } from '../../components/movie-reviews/movie-reviews.component';
import { MovieDetails } from '../../../../core/movie/models/movie-details.model';
import { ReviewStats } from '../../../../core/review/models/review-stats.model';
import { pageTransform } from '../../../../shared/utils/transformers';

@Component({
    selector: 'app-movie-page',
    imports: [MovieDetailsComponent, CastMembersComponent, MovieReviewsComponent],
    templateUrl: './movie-page.component.html',
    styleUrl: './movie-page.component.css',
})
export class MoviePageComponent {
    movieId = input.required({
        alias: 'id',
        transform: numberAttribute,
    });
    page = input.required({
        transform: pageTransform,
    });

    movie = input.required<MovieDetails>();
    reviewStats = input.required<ReviewStats>();
}
