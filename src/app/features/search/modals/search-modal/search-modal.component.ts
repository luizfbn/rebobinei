import { Component, ElementRef, ViewChild, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalRef } from '../../../../shared/modal/modal-ref';
import { MODAL_DATA } from '../../../../shared/modal/modal.tokens';
import { noWhitespaceValidator } from '../../../../shared/validators/no-whitespace.validator';
import { SearchModalConfig } from './search-modal.types';

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
    modalData = inject<SearchModalConfig>(MODAL_DATA);
    router = inject(Router);

    onClose = output<void>();

    searchForm = new FormGroup({
        searchInput: new FormControl(this.modalData?.search ?? '', [
            Validators.required,
            noWhitespaceValidator,
        ]),
    });

    @ViewChild('searchInput')
    set input(element: ElementRef<HTMLInputElement>) {
        if (element) {
            element.nativeElement.focus();
        }
    }

    submit() {
        this.router.navigate(['/search'], {
            queryParams: { q: this.searchForm.value.searchInput },
        });
        this.modalRef.close();
    }
}
