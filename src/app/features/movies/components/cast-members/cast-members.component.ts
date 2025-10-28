import { Component, input } from '@angular/core';
import { CastMember } from '../../models/cast-member.model';
import { CastMemberListComponent } from '../cast-member-list/cast-member-list.component';

@Component({
    selector: 'app-cast-members',
    imports: [CastMemberListComponent],
    templateUrl: './cast-members.component.html',
    styleUrl: './cast-members.component.css',
})
export class CastMembersComponent {
    cast = input.required<CastMember[]>();
}
