import { Rating } from './rating.model';

export interface ReviewStats {
    average: number;
    totalCount: number;
    counts: Record<Rating, number>;
}
