import { Injectable, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ReviewService } from '../../../core/review/services/review.service';

interface ReviewController {
    deleteReview(...args: Parameters<ReviewService['delete']>): Observable<unknown> | undefined;
}

@Injectable({
    providedIn: 'root',
})
export class ReviewContextService {
    private currentController = signal<ReviewController | null>(null);

    private reviewDeletedSource = new Subject<string>();
    reviewDeleted$ = this.reviewDeletedSource.asObservable();

    setController(controller: ReviewController | null) {
        this.currentController.set(controller);
    }

    getController() {
        return this.currentController();
    }

    notifyDeleteSuccess(reviewId: string) {
        this.reviewDeletedSource.next(reviewId);
    }
}
