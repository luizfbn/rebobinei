import { CastMember } from './cast-member.model';

export interface MovieDetails {
    tmdbId: number;
    title: string;
    originalTitle: string;
    overview: string;
    releaseDate: string | null;
    posterUrl: string | null;
    backdropUrl: string | null;
    genres: string[];
    runtime: number;
    budget: number;
    revenue: number;
    certification: string | null;
    directors: string[];
    cast: CastMember[];
}
