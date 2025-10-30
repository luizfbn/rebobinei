import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../../../../shared/validators/no-whitespace.validator';
import { RatingComponent } from '../rating/rating.component';

@Component({
    selector: 'app-review-form',
    imports: [ReactiveFormsModule, RatingComponent],
    templateUrl: './review-form.component.html',
    styleUrl: './review-form.component.css',
})
export class ReviewFormComponent {
    reviewSubmit = output<typeof this.reviewForm.value>();

    reviewForm = new FormGroup({
        rating: new FormControl(0, [Validators.min(1)]),
        comment: new FormControl('', [Validators.maxLength(1000), noWhitespaceValidator]),
    });

    get rating() {
        return this.reviewForm.get('rating');
    }

    get comment() {
        return this.reviewForm.get('comment');
    }

    onSubmit() {
        if (this.reviewForm.invalid) return;
        this.reviewSubmit.emit(this.reviewForm.value);
    }
}
