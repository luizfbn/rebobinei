import { Rating } from '../enums/rating.enum';

export interface ReviewWithMovie {
    id: string;
    rating: Rating;
    comment: string | null;
    createdAt: string;
    movie: {
        tmdbId: number;
        title: string;
        originalTitle: string;
        overview: string;
        posterUrl: string | null;
        backdropUrl: string | null;
    };
}
