import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RatingComponent } from '../../../../shared/components/rating/rating.component';

interface UserReview {
    id: string;
    rating: number; // 1 | 2 | 3 | 4 | 5;
    comment: string | null;
    createdAt: string;
    movie: {
        tmdbId: number;
        title: string;
        originalTitle: string;
        overview: string;
        posterUrl: string | null;
        backdropUrl: string | null;
    };
}

@Component({
    selector: 'app-user-review',
    imports: [RatingComponent, DatePipe],
    templateUrl: './user-review.component.html',
    styleUrl: './user-review.component.css',
})
export class UserReviewComponent {
    review = input.required<UserReview>();
}
