import { ViewportScroller } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, Event as RouterEvent, Router, Scroll } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ScrollStrategyService {
    private router = inject(Router);
    private viewportScroller = inject(ViewportScroller);

    private previousUrl: string | undefined;
    private previousRoutePreservedScroll = false;

    constructor() {
        this.setupScrollListener();
    }

    private setupScrollListener() {
        this.router.events
            .pipe(
                filter((e: RouterEvent): e is Scroll => e instanceof Scroll),
                takeUntilDestroyed()
            )
            .subscribe((e: Scroll) => {
                this.handleScrollEvent(e);
            });
    }

    private handleScrollEvent(e: Scroll) {
        const currentUrlRaw = e.routerEvent.url;
        const currentRoutePreservesScroll = this.shouldPreserveScroll(
            this.router.routerState.snapshot.root
        );

        const currentPath = this.getPath(currentUrlRaw);
        const previousPath = this.previousUrl ? this.getPath(this.previousUrl) : undefined;

        // 1. NAVIGATING TO A ROUTE WITH preserveScroll
        if (currentRoutePreservesScroll) {
            const isDrillingDown =
                previousPath && previousPath !== '/' && currentPath.startsWith(previousPath);

            if (isDrillingDown) {
                this.restorePosition(e);
            } else {
                this.resetPosition(e);
            }

            this.updateHistory(currentUrlRaw, currentRoutePreservesScroll);
            return;
        }

        // 2. LEAVING A ROUTE WITH preserveScroll (Going back to the parent)
        if (this.previousRoutePreservedScroll && previousPath) {
            const isReturningToParent = previousPath.startsWith(currentPath);

            if (isReturningToParent) {
                this.restorePosition(e);
                this.updateHistory(currentUrlRaw, currentRoutePreservesScroll);
                return;
            }
        }

        // 3. DEFAULT NAVIGATION
        this.resetPosition(e);
        this.updateHistory(currentUrlRaw, currentRoutePreservesScroll);
    }

    private getPath(url: string) {
        return url.split('?')[0].split('#')[0];
    }

    private restorePosition(e: Scroll) {
        if (e.position) {
            this.viewportScroller.scrollToPosition(e.position);
        }
    }

    private resetPosition(e: Scroll) {
        if (e.position) {
            this.viewportScroller.scrollToPosition(e.position);
        } else if (e.anchor) {
            this.viewportScroller.scrollToAnchor(e.anchor);
        } else {
            this.viewportScroller.scrollToPosition([0, 0]);
        }
    }

    private updateHistory(url: string, preserves: boolean) {
        this.previousUrl = url;
        this.previousRoutePreservedScroll = preserves;
    }

    private shouldPreserveScroll(route: ActivatedRouteSnapshot): boolean {
        if (route.data && route.data['preserveScroll']) {
            return true;
        }
        if (route.firstChild) {
            return this.shouldPreserveScroll(route.firstChild);
        }
        return false;
    }
}
