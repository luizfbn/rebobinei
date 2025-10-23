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
    selector: 'app-user-review-item',
    imports: [RatingComponent, DatePipe],
    templateUrl: './user-review-item.component.html',
    styleUrl: './user-review-item.component.css',
})
export class UserReviewItemComponent {
    review = input.required<UserReview>();
}
