import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class DeviceService {

    /** `Subject` que se actualiza con el estado del flag `_isMobile`. */
    private readonly _isMobileSource: Subject<boolean> = new Subject<boolean>();

    /** Evento disparado cada  */
    readonly isMobileEvent$: Observable<boolean> = this._isMobileSource.asObservable();

    /** Flag que indica si actualmente el ancho de la pantalla corresponde al de un dispositivo móvil. */
    private _isMobile: boolean = false;
    
    constructor(
        private breakpointObserver: BreakpointObserver,
    ) {
        this.breakpointObserver.observe(['(max-width: 599px)']).subscribe((breakPoint: BreakpointState) => {        
            this._isMobile = breakPoint.matches;
            this._isMobileSource.next(this._isMobile);
        });
    }

    /**
     * Verifica si el ancho de la pantalla corresponde al de un dispositivo móvil.
     * @returns `true` en caso de que sea un dispositivo móvil, `false` en caso contrario
     */
    isMobile(): boolean {
         return this._isMobile;
    }
}