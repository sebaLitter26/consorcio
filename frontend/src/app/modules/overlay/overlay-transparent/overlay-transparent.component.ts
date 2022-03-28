import { Component, OnInit } from '@angular/core';
import { OverlayData, OverlayService } from '../services/overlay.service';

@Component({
  selector: 'app-overlay-transparent',
  templateUrl: './overlay-transparent.component.html',
  styleUrls: ['./overlay-transparent.component.scss']
})
export class OverlayTransparentComponent implements OnInit {

    display: boolean = false;
    currentData: OverlayData | null = null;

    constructor(
        private overlayService: OverlayService,
    ) {}

    ngOnInit(): void {
        this.overlayService.transparent.subscribe((data: OverlayData | null) => {
            if (data) {
                this.currentData = data;
                this.display = true;
            } else {
                this.currentData = null;
                this.display = false;
            }
        });
    }

    /**
     * Esconde el overlay y ejecuta la función que recibe como dato
     */
    hide() {
        this.display = false;
        this.currentData?.componentRef[this.currentData.functionName]();
    }
}