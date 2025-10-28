import { Component, input } from '@angular/core';
import { CastMember } from '../../models/cast-member.model';
import { MediaCardComponent } from '../../../../shared/components/media-card/media-card.component';

@Component({
    selector: 'app-cast-member-list',
    imports: [MediaCardComponent],
    templateUrl: './cast-member-list.component.html',
    styleUrl: './cast-member-list.component.css',
})
export class CastMemberListComponent {
    cast = input.required<CastMember[]>();
}
