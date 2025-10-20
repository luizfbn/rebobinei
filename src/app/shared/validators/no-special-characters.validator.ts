import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noSpecialCharactersValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
        return null;
    }
    const noSpecialCharactersRegex = /^[a-zA-Z0-9_]+$/;
    const hasSpecialCharacteres = !noSpecialCharactersRegex.test(control.value as string);
    return hasSpecialCharacteres ? { specialcharacters: true } : null;
}
