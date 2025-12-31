import { Component, inject, input, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, filter, finalize, switchMap, tap } from 'rxjs';
import { BaseModalComponent } from '../../../../shared/modal/base-modal/base-modal.component';
import { ReviewDetailsComponent } from '../../components/review-details/review-details.component';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { ReviewDetails } from '../../../../core/review/models/review-details.model';
import { Alert } from '../../../../shared/models/alert.model';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { ReviewContextService } from '../../services/review-context.service';
import { ReviewDeleteConfirmModalService } from '../review-delete-confirm-modal/review-delete-confirm-modal.service';

@Component({
    selector: 'app-review-detail-modal',
    imports: [BaseModalComponent, ReviewDetailsComponent, AlertComponent],
    templateUrl: './review-detail-modal.component.html',
    styleUrl: './review-detail-modal.component.css',
})
export class ReviewDetailModalComponent {
    router = inject(Router);
    route = inject(ActivatedRoute);
    authService = inject(AuthService);
    reviewDeleteConfirmModalService = inject(ReviewDeleteConfirmModalService);
    reviewContext = inject(ReviewContextService);

    @ViewChild('reviewDeleteConfirmModal', { read: ViewContainerRef })
    reviewDeleteConfirmModalContainer!: ViewContainerRef;

    reviewId = input.required({
        alias: 'id',
    });
    review = input.required<ReviewDetails>();

    deletingReview = signal(false);
    alert = signal<Alert>({
        type: 'error',
        message: 'Ocorreu um erro.',
        show: false,
    });

    closeModal() {
        this.router.navigate(['../../'], {
            relativeTo: this.route,
            queryParamsHandling: 'preserve',
        });
    }

    onDeleteReview(id: string) {
        const controller = this.reviewContext.getController();
        if (!controller) {
            this.closeModal();
            return;
        }

        const reviewDeleteModal = this.reviewDeleteConfirmModalService.open(
            this.reviewDeleteConfirmModalContainer
        );

        reviewDeleteModal.afterClosed
            .pipe(
                filter((confirmDelete) => confirmDelete === true),
                tap(() => this.deletingReview.set(true)),
                switchMap(() => controller.deleteReview(id) ?? EMPTY),
                finalize(() => this.deletingReview.set(false))
            )
            .subscribe({
                next: () => {
                    this.reviewContext.notifyDeleteSuccess(id);
                    this.closeModal();
                },
                error: (err) => {
                    console.error(err);
                    this.alert.set({ type: 'error', message: err.error?.message, show: true });
                },
            });
    }
}
