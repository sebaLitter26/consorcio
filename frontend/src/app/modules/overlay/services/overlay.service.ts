import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Estructura usada para los servicios compartidos de overlay
 */
export interface OverlayData {
    componentRef: any,
    functionName: string,
}

@Injectable({
    providedIn: "root",
})
export class OverlayService {
    private transparentSource: BehaviorSubject<OverlayData | null> = new BehaviorSubject<OverlayData | null>(null);
    transparent: Observable<OverlayData | null> = this.transparentSource.asObservable();

    private loadingSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    loading: Observable<boolean> = this.loadingSource.asObservable();
  
    constructor() {}

    displayTransparentOverlay(componentRef: any, functionName: string) {
        this.transparentSource.next({
            componentRef: componentRef,
            functionName: functionName,
        });
    }

    hideTransparentOverlay() {
        this.transparentSource.next(null);
    }

    displayLoadingOverlay() {
        this.loadingSource.next(true);
    }

    hideLoadingOverlay() {
        this.loadingSource.next(false);
    }
}