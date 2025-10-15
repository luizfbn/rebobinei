import { Component, computed, input, model, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-page-selector',
    imports: [ReactiveFormsModule],
    templateUrl: './page-selector.component.html',
    styleUrl: './page-selector.component.css',
})
export class PageSelectorComponent implements OnInit {
    currentPage = model.required<number>();
    totalPages = input.required<number>();
    totalPagesArray = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));
    selectForm!: FormGroup<{ select: FormControl<number | null> }>;

    ngOnInit() {
        this.selectForm = new FormGroup({
            select: new FormControl(this.currentPage()),
        });
    }

    onPageChange(event: Event) {
        const selectedValue = (event.target as HTMLSelectElement).value;
        this.currentPage.set(Number(selectedValue));
    }
}
