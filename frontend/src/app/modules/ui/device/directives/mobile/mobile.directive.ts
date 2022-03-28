import { Directive, ElementRef, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/modules/ui/device/services/device.service';

@Directive({
    selector: '[appMobile]'
})
export class MobileDirective implements OnInit {

    private _originalDisplay: string = "block";

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private deviceService: DeviceService,
    ) { }

    ngOnInit(): void {
        this._originalDisplay = this.elementRef.nativeElement.style.display;

        if (!this.deviceService.isMobile()) {
            this.elementRef.nativeElement.style.display = "none";
        }

        this.deviceService.isMobileEvent$.subscribe((isMobile: boolean) => {
            this.elementRef.nativeElement.style.display = isMobile ? this._originalDisplay : "none";
        });
    }
}
