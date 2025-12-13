import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-password-confirm-form',
    imports: [ReactiveFormsModule],
    templateUrl: './password-confirm-form.component.html',
    styleUrl: './password-confirm-form.component.css',
})
export class PasswordConfirmFormComponent {
    submitLabel = input<string>('Confirmar');
    cancelLabel = input<string>('Cancelar');
    isLoading = input(false);
    passwordSubmit = output<string>();
    cancel = output<void>();

    passwordForm = new FormGroup({
        password: new FormControl('', [Validators.required]),
    });

    constructor() {
        effect(() => {
            this.isLoading() ? this.passwordForm.disable() : this.passwordForm.enable();
        });
    }

    get password() {
        return this.passwordForm.get('password');
    }

    onSubmit() {
        if (this.passwordForm.invalid) return;
        this.passwordSubmit.emit(this.passwordForm.value.password as string);
    }
}
