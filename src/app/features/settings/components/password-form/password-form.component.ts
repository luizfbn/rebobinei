import { Component, effect, input, output } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { PasswordForm } from '../../models/password-form.model';
import { PasswordInputComponent } from '../../../../shared/components/password-input/password-input.component';

@Component({
    selector: 'app-password-form',
    imports: [ReactiveFormsModule, PasswordInputComponent],
    templateUrl: './password-form.component.html',
    styleUrl: './password-form.component.css',
})
export class PasswordFormComponent {
    passwordSubmit = output<PasswordForm>();
    isLoading = input<boolean>(false);

    passwordForm = new FormGroup(
        {
            currentPassword: new FormControl('', [Validators.required]),
            newPassword: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(64),
            ]),
            passwordConfirmation: new FormControl('', [Validators.required]),
        },
        {
            validators: this.matchPasswordsValidator,
        },
    );

    constructor() {
        effect(() => {
            this.isLoading() ? this.passwordForm.disable() : this.passwordForm.enable();
        });
    }

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
        if (this.passwordForm.invalid) return;
        this.passwordSubmit.emit(this.passwordForm.value as PasswordForm);
    }
}
