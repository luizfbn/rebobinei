import { ElementRef } from '@angular/core';
import { RestrictSpacesDirective } from './restrict-spaces.directive';

describe('RestrictSpacesDirective', () => {
    it('should create an instance', () => {
        const mockElement = document.createElement('input');
        const mockElementRef = new ElementRef(mockElement);
        const directive = new RestrictSpacesDirective(mockElementRef);
        expect(directive).toBeTruthy();
    });
});
