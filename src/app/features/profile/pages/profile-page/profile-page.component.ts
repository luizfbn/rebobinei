import { Component, input } from '@angular/core';
import { UserReviewListComponent } from '../../components/user-review-list/user-review-list.component';
import { pageTransform } from '../../../../shared/utils/transformers';

@Component({
    selector: 'app-profile-page',
    imports: [UserReviewListComponent],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent {
    userId = input.required<string>({
        alias: 'id',
    });
    page = input.required({
        transform: pageTransform,
    });
}
