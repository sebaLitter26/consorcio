import { AfterViewChecked, AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/modules/main/services/profile.service';

const WARN_COLOR: string = "white";
const WARN_BACKGROUND_COLOR: string = "#d50000";

@Directive({
    selector: '[appButtonAuthorization]',
})
export class AuthorizationDirective implements AfterViewChecked {

    /** El nombre del permiso a verificar. */
    @Input('appButtonAuthorization')
    permission: string = "";

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private profileService: ProfileService,
    ) {}

    ngAfterViewChecked(): void {
        if (!this.profileService.hasPermission(this.permission)) {
            if (!(<HTMLButtonElement>this.elementRef.nativeElement).disabled) {
                this.elementRef.nativeElement.style.color = WARN_COLOR;
                this.elementRef.nativeElement.style.backgroundColor = WARN_BACKGROUND_COLOR;
                (<HTMLElement>this.elementRef.nativeElement.firstChild).style.color = WARN_COLOR;
            }
        }
    }
}