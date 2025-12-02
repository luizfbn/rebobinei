import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RatingComponent } from '../../../reviews/components/rating/rating.component';
import { ReviewWithAuthor } from '../../../reviews/models/review-with-author.model';

@Component({
    selector: 'app-movie-review-item',
    imports: [RatingComponent, DatePipe, RouterLink],
    templateUrl: './movie-review-item.component.html',
    styleUrl: './movie-review-item.component.css',
})
export class MovieReviewItemComponent {
    review = input.required<ReviewWithAuthor>();
    isLoading = input(false);
    canDelete = input(false);
    delete = output<string>();

    onDelete(event: PointerEvent) {
        event.stopPropagation();
        event.preventDefault();
        this.delete.emit(this.review().id);
    }
}
