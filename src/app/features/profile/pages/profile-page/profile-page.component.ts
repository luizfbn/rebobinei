import { Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserReviewListComponent } from '../../components/user-review-list/user-review-list.component';
import { pageTransform } from '../../../../shared/utils/transformers';
import { Profile } from '../../../../core/user/models/profile.model';
import { ReviewContextService } from '../../../reviews/services/review-context.service';
import { MovieService } from '../../../../core/movie/services/movie.service';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
    selector: 'app-profile-page',
    imports: [UserReviewListComponent, RouterOutlet],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit, OnDestroy {
    reviewContext = inject(ReviewContextService);
    movieService = inject(MovieService);
    authService = inject(AuthService);

    userId = input.required<string>({
        alias: 'id',
    });
    page = input.required({
        transform: pageTransform,
    });
    profile = input.required<Profile>();

    isDeletingReview = signal(false);

    ngOnInit() {
        this.reviewContext.setController(this.movieService);
    }

    ngOnDestroy() {
        this.reviewContext.setController(null);
    }

    onDeleteReview(id: string) {
        this.isDeletingReview.set(true);
        this.movieService.deleteReview(id).subscribe({
            next: () => {
                this.reviewContext.notifyDeleteSuccess(id);
            },
            error: (err) => {
                this.isDeletingReview.set(false);
                console.error(err);
            },
            complete: () => this.isDeletingReview.set(false),
        });
    }
}
