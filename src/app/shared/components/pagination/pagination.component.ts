import { Component, input, model, computed } from '@angular/core';

@Component({
    selector: 'app-pagination',
    imports: [],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.css',
})
export class PaginationComponent {
    currentPage = model<number>(1);
    totalPages = input<number>(1);
    maxVisiblePages = input<number>(5);

    currentPageBtnClasses = computed(
        () => (p: number) =>
            p === this.currentPage()
                ? `px-3 py-1 btn`
                : `px-3 py-1 rounded-lg transition-colors hover:bg-neutral-900 hover:cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed`
    );

    visiblePages = computed(() => {
        const total = this.totalPages();
        const current = this.currentPage();
        const max = this.maxVisiblePages();

        const half = Math.floor(max / 2);

        let start = Math.max(1, current - half);
        let end = start + max - 1;

        if (end > total) {
            end = total;
            start = Math.max(1, end - max + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    });

    goTo(page: number) {
        if (page < 1 || page > this.totalPages()) return;
        this.currentPage.set(page);
    }

    first() {
        this.goTo(1);
    }

    prev() {
        this.goTo(this.currentPage() - 1);
    }

    next() {
        this.goTo(this.currentPage() + 1);
    }

    last() {
        this.goTo(this.totalPages());
    }
}
