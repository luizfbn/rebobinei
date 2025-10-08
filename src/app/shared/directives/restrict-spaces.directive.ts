import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appRestrictSpaces]',
})
export class RestrictSpacesDirective {
    constructor(private el: ElementRef<HTMLInputElement>) {}

    @HostListener('input')
    onInput() {
        const el = this.el.nativeElement;
        const initialValue = el.value;

        const selectionStart = el.selectionStart;
        if (selectionStart === null) {
            el.value = initialValue.replace(/\s/g, '');
            el.dispatchEvent(new Event('input', { bubbles: true }));
            return;
        }

        const cleanedValue = initialValue.replace(/\s/g, '');

        if (initialValue !== cleanedValue) {
            const originalSubstring = initialValue.substring(0, selectionStart);
            const cleanedSubstring = originalSubstring.replace(/\s/g, '');
            const spacesRemovedBeforeCursor = originalSubstring.length - cleanedSubstring.length;
            const newCursorPosition = selectionStart - spacesRemovedBeforeCursor;

            el.value = cleanedValue;
            el.setSelectionRange(newCursorPosition, newCursorPosition);
            el.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }
}
