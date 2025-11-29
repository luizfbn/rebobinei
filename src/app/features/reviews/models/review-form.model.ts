import { Rating } from './rating.model';

export interface ReviewForm {
    rating: Rating;
    comment?: string;
}
