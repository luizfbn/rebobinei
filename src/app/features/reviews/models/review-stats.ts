import { Rating } from '../enums/rating.enum';

export interface ReviewStats {
    average: number;
    totalCount: number;
    counts: {
        [key in Rating]: number;
    };
}
