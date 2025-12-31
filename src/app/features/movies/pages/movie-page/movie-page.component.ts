import { Component, inject, input, numberAttribute, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieDetailsComponent } from '../../components/movie-details/movie-details.component';
import { CastMembersComponent } from '../../components/cast-members/cast-members.component';
import { MovieReviewsComponent } from '../../components/movie-reviews/movie-reviews.component';
import { MovieDetails } from '../../../../core/movie/models/movie-details.model';
import { ReviewStats } from '../../../../core/review/models/review-stats.model';
import { pageTransform } from '../../../../shared/utils/transformers.util';
import { MovieStateService } from '../../services/movie-state.service';
import { ReviewContextService } from '../../../reviews/services/review-context.service';

@Component({
    selector: 'app-movie-page',
    imports: [MovieDetailsComponent, CastMembersComponent, MovieReviewsComponent, RouterOutlet],
    templateUrl: './movie-page.component.html',
    styleUrl: './movie-page.component.css',
})
export class MoviePageComponent implements OnInit, OnDestroy {
    movieStateService = inject(MovieStateService);
    reviewContext = inject(ReviewContextService);

    movieId = input.required({
        alias: 'id',
        transform: numberAttribute,
    });
    page = input.required({
        transform: pageTransform,
    });

    movie = input.required<MovieDetails>();
    reviewStats = input.required<ReviewStats>();

    ngOnInit() {
        this.reviewContext.setController(this.movieStateService);
    }

    ngOnDestroy() {
        this.reviewContext.setController(null);
    }
}
