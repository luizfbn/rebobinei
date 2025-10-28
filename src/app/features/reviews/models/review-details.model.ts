import { Rating } from '../enums/rating.enum';

export interface ReviewDetails {
    id: string;
    rating: Rating;
    comment: string | null;
    createdAt: string;
    updatedAt: string;
    author: {
        id: string;
        name: string;
        username: string;
    };
    movie: {
        tmdbId: number;
        title: string;
        originalTitle: string;
        overview: string;
        posterUrl: string | null;
        backdropUrl: string | null;
    };
}
