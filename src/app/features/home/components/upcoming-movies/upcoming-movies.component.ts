import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-upcoming-movies',
    imports: [RouterLink, DatePipe],
    templateUrl: './upcoming-movies.component.html',
    styleUrl: './upcoming-movies.component.css',
})
export class UpcomingMoviesComponent {
    movies = signal({
        page: 1,
        totalPages: 53730,
        totalResults: 1074598,
        data: [
            {
                tmdbId: 1062722,
                title: 'Frankenstein',
                originalTitle: 'Frankenstein',
                overview:
                    'Dr. Victor Frankenstein, um cientista brilhante, mas egoísta, dá vida a uma criatura em um experimento monstruoso que acaba levando à ruína tanto do criador quanto de sua trágica criação.',
                releaseDate: '2025-10-17T00:00:00.000Z',
                posterUrl: 'https://image.tmdb.org/t/p/w500/cXsMxClCcAF1oMwoXZvbKwWoNeS.jpg',
                backdropUrl: 'https://image.tmdb.org/t/p/original/hpXBJxLD2SEf8l2CspmSeiHrBKX.jpg',
            },
            {
                tmdbId: 1248226,
                title: 'Um Dia Fora de Controle',
                originalTitle: 'Playdate',
                overview:
                    'Quando o contador desempregado Brian leva seu filho para brincar com o filho de Jeff, pai que fica em casa, ele espera um dia tranquilo. Em vez disso, eles acabam perseguidos por mercenários, e Brian — totalmente despreparado — precisa sobreviver a um obstáculo absurdo atrás do outro. A vida de pai de família vira um caos de filme de ação nesta aventura hilária.',
                releaseDate: '2025-11-05T00:00:00.000Z',
                posterUrl: 'https://image.tmdb.org/t/p/w500/auLOTlulof19GSPrNomyG7myfzN.jpg',
                backdropUrl: 'https://image.tmdb.org/t/p/original/5lQ4euO30sDin5nCifvi0vURFNd.jpg',
            },
            {
                tmdbId: 1054867,
                title: 'Uma Batalha Após a Outra',
                originalTitle: 'One Battle After Another',
                overview:
                    'Bob Ferguson (DiCaprio), um ex-revolucionário, viveu a juventude como integrante de um grupo de guerrilha, mas agora a sua fracassada vida o atinge em cheio quando o mais cruel de seus inimigos retorna após passar 16 anos e resolve sequestrar sua filha. Diante de tamanha urgência, ele reúne seus antigos companheiros e embarca em um implacável desafio em que precisará correr contra o tempo para salvar quem ele mais ama.',
                releaseDate: '2025-09-23T00:00:00.000Z',
                posterUrl: 'https://image.tmdb.org/t/p/w500/2peYXW6CoruehDnKJGMjl2NuaNB.jpg',
                backdropUrl: 'https://image.tmdb.org/t/p/original/zpEWFNqoN8Qg1SzMMHmaGyOBTdW.jpg',
            },
        ],
    });
}
