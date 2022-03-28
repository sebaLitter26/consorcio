import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ResolveEnd, ResolveStart } from '@angular/router';
import { OverlayService } from '../services/overlay.service';

@Component({
  selector: 'app-overlay-loading',
  templateUrl: './overlay-loading.component.html',
  styleUrls: ['./overlay-loading.component.scss']
})
export class OverlayLoadingComponent implements OnInit, OnDestroy {

  display: boolean = false;
  subscription: Subscription | null = null;

    constructor(
        private overlayService: OverlayService,
        private router: Router,
    ) {
    this.router.events.subscribe(
        event => {
            if (event instanceof ResolveStart) {
                this.overlayService.displayLoadingOverlay();
            } else if (event instanceof ResolveEnd) {
                this.overlayService.hideLoadingOverlay();
            }
        },
        () => {
            this.overlayService.hideLoadingOverlay();
        }
    );
    }

    ngOnInit(): void {
        this.subscription = this.overlayService.loading.subscribe((display: boolean) => {
            this.display = display;
        });
    }

    ngOnDestroy(): void {
        this.overlayService.hideLoadingOverlay();
        this.subscription?.unsubscribe();
    }
}
