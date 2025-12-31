import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, ElementRef, input, signal, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-media-card',
    imports: [RouterLink, NgTemplateOutlet],
    templateUrl: './media-card.component.html',
    styleUrl: './media-card.component.css',
})
export class MediaCardComponent implements AfterViewInit {
    title = input.required<string>();
    subtitle = input<string | null>();
    customRouterLink = input<string | any[] | null>();

    @ViewChild('contentWrapper') contentWrapper!: ElementRef<HTMLDivElement>;
    contentWidth = signal(0);

    ngAfterViewInit() {
        this.contentWidth.set(this.contentWrapper.nativeElement.offsetWidth);
    }
}
