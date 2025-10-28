import { Component, input, signal } from '@angular/core';
import { MovieDetailsComponent } from '../../components/movie-details/movie-details.component';
import { MovieDetails } from '../../models/movie-details.model';
import { CastMembersComponent } from '../../components/cast-members/cast-members.component';

@Component({
    selector: 'app-movie-page',
    imports: [MovieDetailsComponent, CastMembersComponent],
    templateUrl: './movie-page.component.html',
    styleUrl: './movie-page.component.css',
})
export class MoviePageComponent {
    movieId = input.required<string>({
        alias: 'id',
    });

    movie = signal<MovieDetails>({
        tmdbId: 1061474,
        title: 'Superman',
        originalTitle: 'Superman',
        overview:
            'Superman, um jovem repórter de Metrópolis, embarca em uma jornada para reconciliar sua herança kryptoniana com sua criação humana como Clark Kent.',
        releaseDate: '2025-07-09T00:00:00.000Z',
        posterUrl: 'https://image.tmdb.org/t/p/w500/xeZ8oG6W60fEPf9yCjERUXiHRBF.jpg',
        backdropUrl: 'https://image.tmdb.org/t/p/original/eGX66zonvc4bXg3rM08RUxdYSDx.jpg',
        runtime: 128,
        budget: 225000000,
        revenue: 615800000,
        certification: '14',
        genres: ['Ficção científica', 'Aventura', 'Ação'],
        directors: ['James Gunn'],
        cast: [
            {
                tmdbId: 1785590,
                name: 'David Corenswet',
                character: 'Superman',
                profileUrl: 'https://image.tmdb.org/t/p/w500/qB0hBMu4wU1nPrqtdUQP3sQeN5t.jpg',
            },
            {
                tmdbId: 993774,
                name: 'Rachel Brosnahan',
                character: 'Lois Lane',
                profileUrl: 'https://image.tmdb.org/t/p/w500/1f9NK43gWrXN2uMmYMlennB7jCC.jpg',
            },
            {
                tmdbId: 3292,
                name: 'Nicholas Hoult',
                character: 'Lex Luthor',
                profileUrl: 'https://image.tmdb.org/t/p/w500/laeAYQVBV9U3DkJ1B4Cn1XhpT8P.jpg',
            },
            {
                tmdbId: 39391,
                name: 'Edi Gathegi',
                character: 'Mr. Terrific',
                profileUrl: 'https://image.tmdb.org/t/p/w500/dt8yMyycDlzxkjhmuuJJ4tXDbp4.jpg',
            },
            {
                tmdbId: 51797,
                name: 'Nathan Fillion',
                character: 'Guy Gardner',
                profileUrl: 'https://image.tmdb.org/t/p/w500/q31mXXgnN5PsuIjEqaaAPvBDvHc.jpg',
            },
            {
                tmdbId: 1428070,
                name: 'Isabela Merced',
                character: 'Hawkgirl',
                profileUrl: 'https://image.tmdb.org/t/p/w500/5R1oi4PH7GXWETJS8SbSo673gJt.jpg',
            },
            {
                tmdbId: 1601451,
                name: 'María Gabriela de Faría',
                character: 'The Engineer',
                profileUrl: 'https://image.tmdb.org/t/p/w500/joKXt8ai99udROK7VEFCDsBEm3Y.jpg',
            },
            {
                tmdbId: 61263,
                name: 'Skyler Gisondo',
                character: 'Jimmy Olsen',
                profileUrl: 'https://image.tmdb.org/t/p/w500/vyalCuJUUP7Ht1vMWZQzhOrscXV.jpg',
            },
            {
                tmdbId: 21088,
                name: 'Alan Tudyk',
                character: 'Gary',
                profileUrl: 'https://image.tmdb.org/t/p/w500/jUuUbPuMGonFT5E2pcs4alfqaCN.jpg',
            },
            {
                tmdbId: 5441666,
                name: 'Grace Chan',
                character: 'Superman Robot #12 (voice)',
                profileUrl: 'https://image.tmdb.org/t/p/w500/vs6aMdkXkR8A0sOCXK6AGIrVeHb.jpg',
            },
        ],
    });
}
