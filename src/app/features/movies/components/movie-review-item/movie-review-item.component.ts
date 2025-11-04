import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReviewWithAuthor } from '../../../reviews/models/review-with-author.model';
import { RatingComponent } from '../../../reviews/components/rating/rating.component';

@Component({
    selector: 'app-movie-review-item',
    imports: [RatingComponent, DatePipe, RouterLink],
    templateUrl: './movie-review-item.component.html',
    styleUrl: './movie-review-item.component.css',
})
export class MovieReviewItemComponent {
    review = input.required<ReviewWithAuthor>();
}
