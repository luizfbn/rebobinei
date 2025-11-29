import { Component, inject } from '@angular/core';
import { CastMemberListComponent } from '../cast-member-list/cast-member-list.component';
import { MovieStateService } from '../../services/movie-state.service';

@Component({
    selector: 'app-cast-members',
    imports: [CastMemberListComponent],
    templateUrl: './cast-members.component.html',
    styleUrl: './cast-members.component.css',
})
export class CastMembersComponent {
    movieStateService = inject(MovieStateService);
}
