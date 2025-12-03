import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ReviewService } from '../../../core/review/services/review.service';
import { ReviewDetails } from '../../../core/review/models/review-details.model';

export const reviewDetailsResolver: ResolveFn<ReviewDetails> = (route, state) => {
    const reviewService = inject(ReviewService);
    const reviewId = route.paramMap.get('id')!;
    return reviewService.getDetails(reviewId);
};
