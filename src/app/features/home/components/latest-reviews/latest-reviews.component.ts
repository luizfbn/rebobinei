import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RatingComponent } from '../../../reviews/components/rating/rating.component';

@Component({
    selector: 'app-latest-reviews',
    imports: [RouterLink, RatingComponent],
    templateUrl: './latest-reviews.component.html',
    styleUrl: './latest-reviews.component.css',
})
export class LatestReviewsComponent {
    reviews = signal({
        page: 1,
        totalPages: 53730,
        totalResults: 1074598,
        data: [
            {
                id: '1',
                rating: 4,
                comment:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta nibh quis ullamcorper imperdiet. Donec blandit pellentesque bibendum. Cras tempus nec ipsum vel accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                createdAt: '2025-07-09T00:00:00.000Z',
                updatedAt: '2025-07-09T00:00:00.000Z',
                author: {
                    id: '123',
                    name: 'Sandro Jorge',
                    username: 'lilsandro',
                },
                movie: {
                    tmdbId: 123,
                    title: 'Superman',
                    originalTitle: 'Superman',
                    overview:
                        'Superman, um jovem repórter de Metrópolis, embarca em uma jornada para reconciliar sua herança kryptoniana com sua criação humana como Clark Kent.',
                    posterUrl:
                        'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/xeZ8oG6W60fEPf9yCjERUXiHRBF.jpg',
                    backdropUrl:
                        'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/xeZ8oG6W60fEPf9yCjERUXiHRBF.jpg',
                },
            },
            {
                id: '2',
                rating: 3,
                comment:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta nibh quis ullamcorper imperdiet.',
                createdAt: '2025-07-09T00:00:00.000Z',
                updatedAt: '2025-07-09T00:00:00.000Z',
                author: {
                    id: '122',
                    name: 'Sandro sandro',
                    username: 'srsandro',
                },
                movie: {
                    tmdbId: 1062722,
                    title: 'Frankenstein',
                    originalTitle: 'Frankenstein',
                    overview:
                        'Dr. Victor Frankenstein, um cientista brilhante, mas egoísta, dá vida a uma criatura em um experimento monstruoso que acaba levando à ruína tanto do criador quanto de sua trágica criação.',
                    posterUrl: 'https://image.tmdb.org/t/p/w500/cXsMxClCcAF1oMwoXZvbKwWoNeS.jpg',
                    backdropUrl:
                        'https://image.tmdb.org/t/p/original/hpXBJxLD2SEf8l2CspmSeiHrBKX.jpg',
                },
            },
            {
                id: '3',
                rating: 5,
                comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                createdAt: '2025-07-09T00:00:00.000Z',
                updatedAt: '2025-07-09T00:00:00.000Z',
                author: {
                    id: '121',
                    name: 'Jorge jorge',
                    username: 'srjorge',
                },
                movie: {
                    tmdbId: 1054867,
                    title: 'Uma Batalha Após a Outra',
                    originalTitle: 'One Battle After Another',
                    overview:
                        'Bob Ferguson (DiCaprio), um ex-revolucionário, viveu a juventude como integrante de um grupo de guerrilha, mas agora a sua fracassada vida o atinge em cheio quando o mais cruel de seus inimigos retorna após passar 16 anos e resolve sequestrar sua filha. Diante de tamanha urgência, ele reúne seus antigos companheiros e embarca em um implacável desafio em que precisará correr contra o tempo para salvar quem ele mais ama.',
                    posterUrl: 'https://image.tmdb.org/t/p/w500/2peYXW6CoruehDnKJGMjl2NuaNB.jpg',
                    backdropUrl:
                        'https://image.tmdb.org/t/p/original/zpEWFNqoN8Qg1SzMMHmaGyOBTdW.jpg',
                },
            },
        ],
    });
}
