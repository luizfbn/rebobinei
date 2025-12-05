import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RatingComponent } from '../../../reviews/components/rating/rating.component';
import { ReviewWithMovie } from '../../../../core/review/models/review-with-movie.model';

@Component({
    selector: 'app-user-review-item',
    imports: [RatingComponent, DatePipe, RouterLink],
    templateUrl: './user-review-item.component.html',
    styleUrl: './user-review-item.component.css',
})
export class UserReviewItemComponent {
    review = input.required<ReviewWithMovie>();
}
