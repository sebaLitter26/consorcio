import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export type SnackBarPanelClass = 'error-snackbar' | 'success-snackbar' | 'warning-snackbar';

@Injectable({
    providedIn: 'root',
})
export class SnackBarService {

    constructor(
        private matSnackBar: MatSnackBar,
        private ngZone: NgZone,
    ) {}

    /**
     * Muestra una notificación del tipo SnackBar con un mensaje
     * @param message el mensaje
     * @param action el texto del botón
     * @param duration la duración de la notificación
     * @param panelClass el `SnackBarPanelClass` a utilizar para el panel
     */
    open(message: string, action: string, duration: number, panelClass?: SnackBarPanelClass) {
    this.ngZone.run(() => {
            this.matSnackBar.open(message, action, {
                duration: duration,
                panelClass: panelClass,
            });
        });
    }
}
