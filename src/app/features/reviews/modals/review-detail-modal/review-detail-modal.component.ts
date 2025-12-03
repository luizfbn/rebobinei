import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BaseModalComponent } from '../../../../shared/modal/base-modal/base-modal.component';
import { ReviewDetailsComponent } from '../../components/review-details/review-details.component';
import { ReviewDetails } from '../../../../core/review/models/review-details.model';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { ReviewContextService } from '../../services/review-context.service';

@Component({
    selector: 'app-review-detail-modal',
    imports: [BaseModalComponent, ReviewDetailsComponent],
    templateUrl: './review-detail-modal.component.html',
    styleUrl: './review-detail-modal.component.css',
})
export class ReviewDetailModalComponent {
    router = inject(Router);
    authService = inject(AuthService);
    reviewContext = inject(ReviewContextService);

    reviewId = input.required({
        alias: 'id',
    });
    review = input.required<ReviewDetails>();

    deletingReview = signal(false);

    closeModal() {
        this.router.navigate(['.', { outlets: { modal: null } }]);
    }

    onDeleteReview(id: string) {
        const controller = this.reviewContext.getController();
        if (!controller) {
            this.closeModal();
            return;
        }
        this.deletingReview.set(true);
        controller.deleteReview(id)?.subscribe({
            next: () => {
                this.deletingReview.set(false);
                this.reviewContext.notifyDeleteSuccess(id);
                this.closeModal();
            },
            error: (err) => {
                this.deletingReview.set(false);
                console.error(err);
            },
        });
    }
}
