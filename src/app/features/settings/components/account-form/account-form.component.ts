import { Component, output } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { noWhitespaceValidator } from '../../../../shared/validators/no-whitespace.validator';

@Component({
    selector: 'app-account-form',
    imports: [ReactiveFormsModule],
    templateUrl: './account-form.component.html',
    styleUrl: './account-form.component.css',
})
export class AccountFormComponent {
    accountSubmit = output<typeof this.accountForm.value>();

    accountForm = new FormGroup(
        {
            name: new FormControl('', [Validators.minLength(3), noWhitespaceValidator]),
            email: new FormControl('', [Validators.email]),
        },
        {
            validators: this.noEmptyFormValidator,
        }
    );

    get name() {
        return this.accountForm.get('name');
    }

    get email() {
        return this.accountForm.get('email');
    }

    noEmptyFormValidator(control: AbstractControl): ValidationErrors | null {
        const nameValue = control.get('name')?.value?.trim();
        const emailValue = control.get('email')?.value?.trim();
        return !nameValue && !emailValue ? { emptyForm: true } : null;
    }

    onSubmit() {
        if (this.accountForm.valid) {
            this.accountSubmit.emit(this.accountForm.value);
        }
    }
}
