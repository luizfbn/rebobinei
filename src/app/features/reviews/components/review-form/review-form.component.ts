import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../../../../shared/validators/no-whitespace.validator';
import { RatingComponent } from '../rating/rating.component';
import { ReviewForm } from '../../models/review-form.model';

@Component({
    selector: 'app-review-form',
    imports: [ReactiveFormsModule, RatingComponent],
    templateUrl: './review-form.component.html',
    styleUrl: './review-form.component.css',
})
export class ReviewFormComponent {
    reviewSubmit = output<ReviewForm>();
    isLoading = input<boolean>(false);

    reviewForm = new FormGroup({
        rating: new FormControl(0, [Validators.min(1), Validators.max(5)]),
        comment: new FormControl('', [Validators.maxLength(2000), noWhitespaceValidator]),
    });

    constructor() {
        effect(() => {
            this.isLoading() ? this.reviewForm.disable() : this.reviewForm.enable();
        });
    }

    get rating() {
        return this.reviewForm.get('rating');
    }

    get comment() {
        return this.reviewForm.get('comment');
    }

    onSubmit() {
        if (this.reviewForm.invalid) return;
        this.reviewSubmit.emit(this.reviewForm.value as ReviewForm);
    }
}
