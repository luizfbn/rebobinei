import { Component, inject, output, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ModalRef } from '../../../../shared/modal/modal-ref';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { LoginForm } from '../../models/login-form.model';
import { RegisterForm } from '../../models/register-form.model';
import { Alert } from '../../../../shared/models/alert.model';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { UserService } from '../../../../core/user/services/user.service';

@Component({
    selector: 'app-auth-modal',
    imports: [LoginFormComponent, RegisterFormComponent, AlertComponent],
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

    onClose = output<void>();

    view = signal<'login' | 'register'>('login');
    loading = signal(false);
    alert = signal<Alert>({
        type: 'error',
        message: 'Ocorreu um erro.',
        show: false,
    });

    onLogin(credentials: LoginForm) {
        this.loading.set(true);
        this.authService
            .login(credentials.email, credentials.password)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                error: (err) => {
                    console.error(err);
                    this.alert.set({ type: 'error', message: err.error?.message, show: true });
                },
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
                next: () =>
                    this.alert.set({
                        type: 'success',
                        message: 'Sua conta foi criada! Agora você pode fazer login.',
                        show: true,
                    }),
                error: (err) => {
                    this.loading.set(false);
                    console.error(err);
                    this.alert.set({ type: 'error', message: err.error?.message, show: true });
                },
                complete: () => this.view.set('login'),
            });
    }

    setView(view: 'login' | 'register') {
        this.alert().show = false;
        this.view.set(view);
    }

    close() {
        this.modalRef.close();
    }
}
