import { Component, ElementRef, ViewChild, output } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { BaseModal } from '../../shared/components/base-modal/base-modal';

@Component({
    selector: 'app-search-modal',
    imports: [BaseModal, ReactiveFormsModule],
    templateUrl: './search-modal.html',
    styleUrl: './search-modal.css',
})
export class SearchModal {
    onClose = output<void>();

    searchForm = new FormGroup({
        searchInput: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    });

    @ViewChild('searchInput')
    set input(element: ElementRef<HTMLInputElement>) {
        if (element) {
            element.nativeElement.focus();
        }
    }

    submit() {
        console.log('Search:', this.searchForm.value.searchInput);
        this.close();
    }

    close() {
        this.onClose.emit();
    }

    noWhitespaceValidator(control: FormControl<string>): ValidationErrors | null {
        const isWhitespace = (control.value || '').trim().length === 0;
        return isWhitespace ? { whitespace: true } : null;
    }
}
