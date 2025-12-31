import {
    Component,
    inject,
    input,
    OnDestroy,
    OnInit,
    signal,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { filter, finalize, switchMap, tap } from 'rxjs';
import { pageTransform } from '../../../../shared/utils/transformers.util';
import { createAlert, showAlert } from '../../../../shared/utils/alert.util';
import { UserReviewListComponent } from '../../components/user-review-list/user-review-list.component';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { Profile } from '../../../../core/user/models/profile.model';
import { ReviewContextService } from '../../../reviews/services/review-context.service';
import { MovieService } from '../../../../core/movie/services/movie.service';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { ReviewDeleteConfirmModalService } from '../../../reviews/modals/review-delete-confirm-modal/review-delete-confirm-modal.service';

@Component({
    selector: 'app-profile-page',
    imports: [UserReviewListComponent, RouterOutlet, AlertComponent],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit, OnDestroy {
    reviewContext = inject(ReviewContextService);
    movieService = inject(MovieService);
    authService = inject(AuthService);
    reviewDeleteConfirmModalService = inject(ReviewDeleteConfirmModalService);

    @ViewChild('reviewDeleteConfirmModal', { read: ViewContainerRef })
    reviewDeleteConfirmModalContainer!: ViewContainerRef;

    userId = input.required<string>({
        alias: 'id',
    });
    page = input.required({
        transform: pageTransform,
    });
    profile = input.required<Profile>();

    isDeletingReview = signal(false);
    alert = createAlert();
    showAlert = showAlert;

    ngOnInit() {
        this.reviewContext.setController(this.movieService);
    }

    ngOnDestroy() {
        this.reviewContext.setController(null);
    }

    onDeleteReview(id: string) {
        const reviewDeleteModal = this.reviewDeleteConfirmModalService.open(
            this.reviewDeleteConfirmModalContainer
        );

        reviewDeleteModal.afterClosed
            .pipe(
                filter((confirmDelete) => confirmDelete === true),
                tap(() => this.isDeletingReview.set(true)),
                switchMap(() => this.movieService.deleteReview(id)),
                finalize(() => this.isDeletingReview.set(false))
            )
            .subscribe({
                next: () => this.reviewContext.notifyDeleteSuccess(id),
                error: (err) => {
                    console.error(err);
                    this.alert.set({ type: 'error', message: err.error?.message, show: true });
                },
            });
    }
}
