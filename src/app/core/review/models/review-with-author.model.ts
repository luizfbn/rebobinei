import { Rating } from './rating.model';

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
