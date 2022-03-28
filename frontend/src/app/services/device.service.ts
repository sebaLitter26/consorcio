import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Injectable({
    providedIn: 'root',
})
export class DeviceService {

    private isMobileSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isMobileEvent: Observable<boolean> = this.isMobileSource.asObservable();

    constructor(
        private breakpointObserver: BreakpointObserver,
    ) {
        this.breakpointObserver.observe(['(max-width: 599px)']).subscribe((breakpointState: BreakpointState) => {
            if (breakpointState.matches) {
                this.isMobileSource.next(true);
            } else {
                this.isMobileSource.next(false);
            }
        });
    }

    isMobile(): boolean {
        return this.isMobileSource.value;
    }
}
