import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarService } from '../../navbar/services/navbar.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

    navbarIsOpen: boolean | null = null;
    isMobile: boolean | null = null;

    constructor(
        private navbarService: NavbarService,
        private breakpointObserver: BreakpointObserver,
    ) {}

    ngOnInit(): void {
        // Si la barra de navegación está abierta, tengo que correr el panel
        this.navbarService.toggleEvent.subscribe((toggle: boolean) => {
            this.navbarIsOpen = toggle;

            if (this.navbarIsOpen && this.isMobile) {
                document.body.style.overflowY = 'hidden';
            } else {
                document.body.style.overflowY = 'auto';
            }
        });

        this.breakpointObserver.observe(['(max-width: 599px)']).subscribe((state: BreakpointState) => {
            this.isMobile = state.matches;
        });
    }

    ngOnDestroy(): void {}
}
