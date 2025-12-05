import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RatingComponent } from '../rating/rating.component';
import { ReviewDetails } from '../../../../core/review/models/review-details.model';

@Component({
    selector: 'app-review-details',
    imports: [RatingComponent, RouterLink, DatePipe],
    templateUrl: './review-details.component.html',
    styleUrl: './review-details.component.css',
})
export class ReviewDetailsComponent {
    review = input.required<ReviewDetails>();
    isLoading = input(false);
    canDelete = input(false);
    delete = output<string>();

    onDelete() {
        this.delete.emit(this.review().id);
    }
}
