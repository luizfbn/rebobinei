import { Component, input } from '@angular/core';
import { MediaCardComponent } from '../../../../shared/components/media-card/media-card.component';
import { CastMember } from '../../../../core/movie/models/cast-member.model';

@Component({
    selector: 'app-cast-member-list',
    imports: [MediaCardComponent],
    templateUrl: './cast-member-list.component.html',
    styleUrl: './cast-member-list.component.css',
})
export class CastMemberListComponent {
    cast = input<CastMember[]>();
}
