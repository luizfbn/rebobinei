import { Component, forwardRef, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RATINGS } from '../../../../core/review/models/rating.model';

@Component({
    selector: 'app-rating',
    imports: [],
    templateUrl: './rating.component.html',
    styleUrl: './rating.component.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RatingComponent),
            multi: true,
        },
    ],
})
export class RatingComponent implements ControlValueAccessor {
    rating = model(0);
    disabled = model(false);
    items = signal([...RATINGS]);

    setRating(value: number) {
        if (this.disabled()) return;
        this.rating.set(value);
        this.onChange(this.rating());
        this.onTouched();
    }

    private onChange = (value: number) => {};
    private onTouched = () => {};

    writeValue(value: number) {
        this.rating.set(value ?? 0);
    }

    registerOnChange(fn: (value: number) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled.set(isDisabled);
    }
}
