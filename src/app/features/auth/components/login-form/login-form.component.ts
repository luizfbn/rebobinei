import { Component, input, output, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from '../../models/login-form.model';

@Component({
    selector: 'app-login-form',
    imports: [ReactiveFormsModule],
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
    isLoading = input<boolean>(false);
    loginSubmit = output<LoginForm>();

    loginForm = new FormGroup({
        email: new FormControl('', {
            validators: [Validators.required, Validators.email],
        }),
        password: new FormControl('', {
            validators: [Validators.required],
        }),
    });

    constructor() {
        effect(() => {
            this.isLoading() ? this.loginForm.disable() : this.loginForm.enable();
        });
    }

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    onSubmit() {
        if (this.loginForm.invalid) return;
        this.loginSubmit.emit(this.loginForm.value as LoginForm);
    }
}
