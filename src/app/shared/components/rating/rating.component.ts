import { Component, input } from '@angular/core';

@Component({
    selector: 'app-rating',
    imports: [],
    templateUrl: './rating.component.html',
    styleUrl: './rating.component.css',
})
export class RatingComponent {
    rating = input.required<number>();
    fiveItems = Array.from({ length: 5 }, (_, k) => k + 1);
}
