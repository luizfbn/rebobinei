import { Component, forwardRef, input, model, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-password-input',
    imports: [],
    templateUrl: './password-input.component.html',
    styleUrl: './password-input.component.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PasswordInputComponent),
            multi: true,
        },
    ],
})
export class PasswordInputComponent {
    inputId = input('');
    placeholder = input('');
    disabled = model(false);

    value = signal('');
    type = signal<'password' | 'text'>('password');

    private onChange = (value: string) => {};
    onTouched = () => {};

    writeValue(value: string) {
        this.value.set(value ?? '');
    }

    registerOnChange(fn: (value: string) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled.set(isDisabled);
    }

    onInput(event: Event) {
        const input = event.target as HTMLInputElement;
        this.value.set(input.value);
        this.onChange(this.value());
    }

    toggleVisibility() {
        this.type.update((value) => (value === 'password' ? 'text' : 'password'));
    }
}
