import { Component, inject, output } from '@angular/core';
import { ModalRef } from '../../../../shared/modal/modal-ref';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

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
    view: 'login' | 'register' = 'login';

    onClose = output<void>();

    setView(value: 'login' | 'register') {
        this.view = value;
    }

    onLogin(credentials: any /* LoginCredentials */) {
        console.log('Login', credentials);
        this.modalRef.close();
    }

    onRegister(payload: any /* RegisterPayload */) {
        console.log('Register', payload);
        this.modalRef.close();
    }

    close() {
        this.modalRef.close();
    }
}
