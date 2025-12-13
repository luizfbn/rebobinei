import { Component, effect, inject, input, output } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { AccountForm } from '../../models/account-form.model';
import { noWhitespaceValidator } from '../../../../shared/validators/no-whitespace.validator';
import { noSpecialCharactersValidator } from '../../../../shared/validators/no-special-characters.validator';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
    selector: 'app-account-form',
    imports: [ReactiveFormsModule],
    templateUrl: './account-form.component.html',
    styleUrl: './account-form.component.css',
})
export class AccountFormComponent {
    authService = inject(AuthService);

    accountSubmit = output<AccountForm>();
    isLoading = input<boolean>(false);

    accountForm = new FormGroup(
        {
            name: new FormControl('', [
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
            email: new FormControl('', [Validators.email]),
        },
        {
            validators: this.noEmptyFormValidator,
        }
    );

    constructor() {
        effect(() => {
            this.isLoading() ? this.accountForm.disable() : this.accountForm.enable();
        });

        effect(() => {
            const user = this.authService.currentUser();
            if (!user) return;
            this.accountForm.patchValue(
                {
                    name: user.name,
                    username: user.username,
                    email: user.email,
                },
                { emitEvent: false }
            );
        });
    }

    get name() {
        return this.accountForm.get('name');
    }

    get username() {
        return this.accountForm.get('username');
    }

    get email() {
        return this.accountForm.get('email');
    }

    noEmptyFormValidator(control: AbstractControl): ValidationErrors | null {
        const nameValue = control.get('name')?.value?.trim();
        const usernameValue = control.get('username')?.value?.trim();
        const emailValue = control.get('email')?.value?.trim();
        return !nameValue && !usernameValue && !emailValue ? { emptyForm: true } : null;
    }

    hasChanges() {
        const isNameChanged = this.name?.value !== this.authService.currentUser()?.name;
        const isUsernameChanged = this.username?.value !== this.authService.currentUser()?.username;
        const isEmailChanged = this.email?.value !== this.authService.currentUser()?.email;
        return isNameChanged || isUsernameChanged || isEmailChanged;
    }

    canSubmit() {
        return this.hasChanges() && this.accountForm.valid;
    }

    onSubmit() {
        if (!this.canSubmit()) return;
        this.accountSubmit.emit(this.accountForm.value as AccountForm);
    }
}
