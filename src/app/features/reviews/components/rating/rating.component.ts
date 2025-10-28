import { Component, input, signal } from '@angular/core';
import { Rating } from '../../enums/rating.enum';

@Component({
    selector: 'app-rating',
    imports: [],
    templateUrl: './rating.component.html',
    styleUrl: './rating.component.css',
})
export class RatingComponent {
    rating = input.required<number>();
    ratingCount = Object.values(Rating).filter((v) => typeof v === 'number').length;
    items = signal(Array.from({ length: this.ratingCount }, (_, k) => k + 1));
}
