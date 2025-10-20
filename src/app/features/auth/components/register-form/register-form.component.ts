import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestrictSpacesDirective } from '../../../../shared/directives/restrict-spaces.directive';
import { noWhitespaceValidator } from '../../../../shared/validators/no-whitespace.validator';
import { noSpecialCharactersValidator } from '../../../../shared/validators/no-special-characters.validator';

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
            noWhitespaceValidator,
        ]),
        username: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            noWhitespaceValidator,
            noSpecialCharactersValidator,
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

    onSubmit() {
        if (this.registerForm.valid) {
            this.registerSubmit.emit(this.registerForm.value);
        }
    }
}
