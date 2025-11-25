import { Component, inject, output, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { UserService } from '../../../../core/user/services/user.service';
import { ModalRef } from '../../../../shared/modal/modal-ref';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { LoginForm } from '../../models/login-form.model';
import { RegisterForm } from '../../models/register-form.model';

@Component({
    selector: 'app-auth-modal',
    imports: [LoginFormComponent, RegisterFormComponent],
    templateUrl: './auth-modal.component.html',
    styleUrl: './auth-modal.component.css',
    host: {
        class: 'contents',
    },
})
export class AuthModalComponent {
    modalRef = inject(ModalRef<void>);
    authService = inject(AuthService);
    userService = inject(UserService);

    view = signal<'login' | 'register'>('login');
    loading = signal(false);
    onClose = output<void>();

    onLogin(credentials: LoginForm) {
        this.loading.set(true);
        this.authService
            .login(credentials.email, credentials.password)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                error: (err) => console.log(err), // add error toaster
                complete: () => this.close(),
            });
    }

    onRegister(payload: RegisterForm) {
        this.loading.set(true);
        this.userService
            .create({
                name: payload.name,
                username: payload.username,
                email: payload.email,
                password: payload.password,
            })
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                error: (err) => {
                    this.loading.set(false);
                    console.log(err);
                    // add error toaster
                },
                complete: () => this.view.set('login'),
            });
    }

    close() {
        this.modalRef.close();
    }
}
