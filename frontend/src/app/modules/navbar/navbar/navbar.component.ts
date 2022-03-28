import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router } from '@angular/router';
//import { environment } from 'src/environments/environment';
import { NavbarService } from '../services/navbar.service';
import { OverlayService } from '../../overlay/services/overlay.service';
import { NavbarItem, NavigationItem } from '..';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    navbarItems: NavbarItem[] = [];
    navbarIsOpen: boolean | null = null;

    isMobile: boolean = false;

    //environment = environment;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router,
        private overlayService: OverlayService,
        private navbarService: NavbarService,
    ) {}

    ngOnInit(): void {
        this.navbarItems = this.navbarService.getNavbarItems();

        // Evento para abrir y cerrar la barra de navegación
        this.navbarService.toggleEvent.subscribe((toggle: boolean) => {
            this.navbarIsOpen = toggle;
            this.toggleOverlay();
        });

        // Evento de navegación
        this.navbarService.navigationEvent.subscribe((route: string | null) => {
            if (route) {
                this.highlightItem(route);
            }
        });

        // Se define un breakpoint para el ancho de la pantalla (mobile)
        this.breakpointObserver.observe(['(max-width: 599px)']).subscribe((state: BreakpointState) => {
            this.isMobile = state.matches;
        });

        this.highlightItem(this.router.url.substring(1, this.router.url.length));
    }

    /**
     * Navega a la ruta contenida en el item seleccionado
     * @param item el item
     */
    navigate(item: NavigationItem) {
        this.highlightItem(item.route);

        this.toggleNavbar();

        this.router.navigate([item.route]);
    }

    /**
     * Marca el item correspondiente como seleccionado
     * @param item el item
     */
    highlightItem(route: string) {
        // Busco el item a chequear, y deschequeo todos los demás
        for (let navbarItem of this.navbarItems) {
            for (let navigationItem of navbarItem.navigationItems) {
                navigationItem.checked = false;
                if (navigationItem.route == route) {
                    navigationItem.checked = true;
                }
            }
        }
    }

    /**
     * Abre o cierra la barra de navegación
     */
    toggleNavbar() {
        this.navbarService.toggle();
        this.toggleOverlay();
    }

    /**
     * Muestra u oculta el overlay
     */
    toggleOverlay() {
        if (this.navbarIsOpen && this.isMobile) {
            this.overlayService.displayTransparentOverlay(this, 'toggleNavbar');
        } else {
            this.overlayService.hideTransparentOverlay();
        }
    }

    /**
     * Devuelve el ambiente actual
     */
    getEnvironment(): string {
        return 'DEVELOPMENT'
    }
}
