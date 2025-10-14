import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-media-card',
    imports: [RouterLink, NgTemplateOutlet],
    templateUrl: './media-card.component.html',
    styleUrl: './media-card.component.css',
})
export class MediaCardComponent {
    imageUrl = input.required<string>();
    title = input.required<string>();
    subtitle = input<string>();

    routerLink = input<string | any[] | null>();
}
