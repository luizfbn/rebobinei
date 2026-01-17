import { Component, input, output, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestrictSpacesDirective } from '../../../../shared/directives/restrict-spaces.directive';
import { noWhitespaceValidator } from '../../../../shared/validators/no-whitespace.validator';
import { noSpecialCharactersValidator } from '../../../../shared/validators/no-special-characters.validator';
import { RegisterForm } from '../../models/register-form.model';
import { PasswordInputComponent } from '../../../../shared/components/password-input/password-input.component';

@Component({
    selector: 'app-register-form',
    imports: [ReactiveFormsModule, RestrictSpacesDirective, PasswordInputComponent],
    templateUrl: './register-form.component.html',
    styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
    isLoading = input(false);
    registerSubmit = output<RegisterForm>();

    registerForm = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
            noWhitespaceValidator,
        ]),
        username: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
            noWhitespaceValidator,
            noSpecialCharactersValidator,
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(64),
        ]),
    });

    constructor() {
        effect(() => {
            this.isLoading() ? this.registerForm.disable() : this.registerForm.enable();
        });
    }

    get name() {
        return this.registerForm.get('name');
    }

    get username() {
        return this.registerForm.get('username');
    }

    get email() {
        return this.registerForm.get('email');
    }

    get password() {
        return this.registerForm.get('password');
    }

    onSubmit() {
        if (this.registerForm.invalid) return;
        this.registerSubmit.emit(this.registerForm.value as RegisterForm);
    }
}
