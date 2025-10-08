import { Component, output } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { RestrictSpacesDirective } from '../../../../shared/directives/restrict-spaces.directive';

@Component({
    selector: 'app-register-form',
    imports: [ReactiveFormsModule, RestrictSpacesDirective],
    templateUrl: './register-form.component.html',
    styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
    registerSubmit = output<typeof this.registerForm.value>();

    registerForm = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            this.noWhitespaceValidator,
        ]),
        username: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            this.noWhitespaceValidator,
            this.noSpecialCharacters,
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

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

    noWhitespaceValidator(control: FormControl<string>): ValidationErrors | null {
        const isWhitespace = (control.value || '').trim().length === 0;
        return isWhitespace ? { whitespace: true } : null;
    }

    noSpecialCharacters(control: FormControl<string>): ValidationErrors | null {
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        const hasSpecialCharacteres = !usernameRegex.test(control.value);
        return hasSpecialCharacteres ? { specialcharacters: true } : null;
    }

    onSubmit() {
        if (this.registerForm.valid) {
            this.registerSubmit.emit(this.registerForm.value);
        }
    }
}
