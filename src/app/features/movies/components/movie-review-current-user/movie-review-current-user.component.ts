import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReviewWithAuthor } from '../../../../core/review/models/review-with-author.model';
import { RatingComponent } from '../../../reviews/components/rating/rating.component';

@Component({
    selector: 'app-movie-review-current-user',
    imports: [RatingComponent, DatePipe, RouterLink],
    templateUrl: './movie-review-current-user.component.html',
    styleUrl: './movie-review-current-user.component.css',
})
export class MovieReviewCurrentUserComponent {
    review = input.required<ReviewWithAuthor>();
    isLoading = input(false);
    canDelete = input(false);
    delete = output<string>();

    onDelete(event: PointerEvent) {
        this.onInnerLinkClick(event);
        this.delete.emit(this.review().id);
    }

    onInnerLinkClick(event: Event) {
        event.stopPropagation();
        event.preventDefault();
    }
}
