export interface MovieListItem {
    tmdbId: number;
    title: string;
    originalTitle: string;
    overview: string;
    releaseDate: string | null;
    posterUrl: string | null;
    backdropUrl: string | null;
}
