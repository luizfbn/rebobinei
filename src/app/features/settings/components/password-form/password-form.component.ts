import { Component, output } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-password-form',
    imports: [ReactiveFormsModule],
    templateUrl: './password-form.component.html',
    styleUrl: './password-form.component.css',
})
export class PasswordFormComponent {
    passwordSubmit = output<typeof this.passwordForm.value>();

    passwordForm = new FormGroup(
        {
            currentPassword: new FormControl('', [Validators.required]),
            newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
            passwordConfirmation: new FormControl('', [Validators.required]),
        },
        {
            validators: this.matchPasswordsValidator,
        }
    );

    get currentPassword() {
        return this.passwordForm.get('currentPassword');
    }

    get newPassword() {
        return this.passwordForm.get('newPassword');
    }

    get passwordConfirmation() {
        return this.passwordForm.get('passwordConfirmation');
    }

    matchPasswordsValidator(control: AbstractControl): ValidationErrors | null {
        const newPassword = control.get('newPassword')?.value;
        const passwordConfirmation = control.get('passwordConfirmation')?.value;
        return newPassword !== passwordConfirmation ? { noMatchPasswords: true } : null;
    }

    onSubmit() {
        if (this.passwordForm.valid) {
            this.passwordSubmit.emit(this.passwordForm.value);
        }
    }
}
