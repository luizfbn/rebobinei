import { Rating } from '../../../core/review/models/rating.model';

export interface ReviewForm {
    rating: Rating;
    comment?: string;
}
