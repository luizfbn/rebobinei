import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewDetails } from '../../models/review-details.model';
import { BaseModalComponent } from '../../../../shared/modal/base-modal/base-modal.component';
import { ReviewDetailsComponent } from '../../components/review-details/review-details.component';

@Component({
    selector: 'app-review-detail-modal',
    imports: [BaseModalComponent, ReviewDetailsComponent],
    templateUrl: './review-detail-modal.component.html',
    styleUrl: './review-detail-modal.component.css',
})
export class ReviewDetailModalComponent {
    router = inject(Router);

    id = input.required<string>();
    review = signal<ReviewDetails | undefined>({
        id: '1',
        rating: 4,
        comment: 'Bla bla',
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
    });

    closeModal() {
        this.router.navigate(['.', { outlets: { modal: null } }]);
    }
}
