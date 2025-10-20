import { Component, ElementRef, ViewChild, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalRef } from '../../../../shared/modal/modal-ref';
import { noWhitespaceValidator } from '../../../../shared/validators/no-whitespace.validator';

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
        searchInput: new FormControl('', [Validators.required, noWhitespaceValidator]),
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
}
