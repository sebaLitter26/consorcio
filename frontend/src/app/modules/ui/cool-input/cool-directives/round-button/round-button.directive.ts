import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[appRoundButton]'
})
export class RoundButtonDirective implements OnInit {

    constructor(
        private elementRef: ElementRef<HTMLButtonElement>,
    ) {}

    ngOnInit(): void {
        this.elementRef.nativeElement.style.borderRadius = `${this.elementRef.nativeElement.clientHeight / 2}px`;
    }
}
