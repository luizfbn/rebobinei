import { Component, input, output } from '@angular/core';
import { ReviewDetails } from '../../models/review-details.model';
import { RatingComponent } from '../rating/rating.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-review-details',
    imports: [RatingComponent, DatePipe],
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
