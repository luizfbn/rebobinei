import { Component, input, output } from '@angular/core';
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
    submitPassword = output<string>();
    cancel = output<void>();

    passwordForm = new FormGroup({
        password: new FormControl('', [Validators.required]),
    });

    get password() {
        return this.passwordForm.get('password');
    }

    onSubmit() {
        if (this.passwordForm.valid) {
            this.submitPassword.emit(this.passwordForm.value.password!);
        }
    }
}
