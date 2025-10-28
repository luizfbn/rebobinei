import { Rating } from '../enums/rating.enum';

export interface ReviewWithAuthor {
    id: string;
    rating: Rating;
    comment: string | null;
    createdAt: string;
    author: {
        id: string;
        name: string;
        username: string;
    };
}
