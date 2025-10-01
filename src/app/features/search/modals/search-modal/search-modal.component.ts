import { Component, ElementRef, ViewChild, inject, output } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { ModalRef } from '../../../../shared/modal/modal-ref';

@Component({
    selector: 'app-search-modal',
    imports: [ReactiveFormsModule],
    templateUrl: './search-modal.component.html',
    styleUrl: './search-modal.component.css',
    host: {
        class: 'contents',
    },
})
export class SearchModalComponent {
    modalRef = inject(ModalRef<void>);

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
        this.modalRef.close();
    }

    noWhitespaceValidator(control: FormControl<string>): ValidationErrors | null {
        const isWhitespace = (control.value || '').trim().length === 0;
        return isWhitespace ? { whitespace: true } : null;
    }
}
