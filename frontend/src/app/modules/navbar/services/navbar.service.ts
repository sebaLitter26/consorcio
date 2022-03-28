import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavbarItem } from '..';
import { ProfileService } from '../../main/services/profile.service';

@Injectable()
export class NavbarService {

    /** Evento que se dispara cuando se navega a un item de la barra de navegación. */
    private navigationEventSource: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    navigationEvent: Observable<string | null> = this.navigationEventSource.asObservable();

    /** Evento que se dispara cuando se cierra o abre la barra de navegación. */
    private toggleEventSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    toggleEvent: Observable<boolean> = this.toggleEventSource.asObservable();

    /** Un `array` con los items de la barra de navegación. */
    navbarItems: NavbarItem[] = [];

    constructor(
        private profileService: ProfileService,
    ) {
        this.profileService.userChangeEvent().subscribe(
            user => {
                if (user.legajo) {
                    this._initNavbarItems();
                }
            }
        );
    }

    /**
     * Abre o cierra la barra de navegación
     */
    toggle() {
        this.toggleEventSource.next(!this.toggleEventSource.value);
    }

    /**
     * Devuelve los items de navegación del usuario actual
     * @returns `NavbarItem[]`
     */
    getNavbarItems(): NavbarItem[] {
        return this.navbarItems;
    }

    /**
     * Navega a un item de la barra de navegación por ruta
     * @param description la ruta del item
     */
    highlightByRoute(route: string): void {
        this.navigationEventSource.next(route);
    }

    /**
     * Inicializa la barra de navegación con los items correspondientes
     */
    private _initNavbarItems() {
        let preItems: NavbarItem[] = [];

        this.navbarItems = [];

        if (this.profileService.hasModuleAccess("reports")) {
            preItems.push(this._getReportsItems());
        }

        if (this.profileService.hasModuleAccess("reservations")) {
            preItems.push(this._getReservationsItems());
        }

        if (this.profileService.hasModuleAccess("control")) {
            preItems.push(this._getQualityControlItems());
        }

        if (this.profileService.hasModuleAccess("labels")) {
            preItems.push(this._getLabelItems());
        }

        if (this.profileService.hasModuleAccess("operations")) {
            preItems.push(this._getOperationsItems());
        }

        if (this.profileService.hasModuleAccess("novelties")) {
            preItems.push(this._getNoveltiesItems());
        }

        if (this.profileService.hasModuleAccess("development")) {
            preItems.push(this._getDevelopmentItems());
        }

        for (let item of preItems) {
            if (item.navigationItems.length) {
                this.navbarItems.push(item);
            }
        }
    }

    private _getReportsItems(): NavbarItem {
        let reports: NavbarItem = {
            description: "Reportes",
            icon: "fa fa-fw fa-chart-bar",
            navigationItems: [],
        }

        if (this.profileService.hasRouteAccess('my-reports')) {
            reports.navigationItems.push(
                {
                    description: "Mis reportes",
                    icon: "fa fa-fw fa-clipboard-list",
                    route: "reports/my-reports",
                    checked: false,
                },
            );
        }

        if (this.profileService.hasRouteAccess('operation-state')) {
            reports.navigationItems.push(
                {
                    description: "Estado operación",
                    icon: "fa fa-fw fa-project-diagram",
                    route: "reports/operation-state",
                    checked: false,
                },
            );
        }

        return reports;
    }

    private _getReservationsItems(): NavbarItem {
        let reservations: NavbarItem = {
            description: "Reservas",
            icon: "fa fa-fw fa-warehouse",
            navigationItems: [],
        }

        if (this.profileService.hasRouteAccess('reservation-preparation')) {
            reservations.navigationItems.push(
                {
                    description: "Preparación de reservas",
                    icon: "fa fa-fw fa-pallet",
                    route: "reservations/reservation-preparation",
                    checked: false,
                },
            );
        }

        if (this.profileService.hasRouteAccess('reservation-serialization')) {
            reservations.navigationItems.push(
                {
                    description: "Serialización de reserva",
                    icon: "fa fa-fw fa-barcode",
                    route: "reservations/reservation-serialization",
                    checked: false,
                },
            );
        }

        return reservations;
    }

    private _getQualityControlItems(): NavbarItem {
        let control: NavbarItem = {
            description: "Calidad",
            icon: "fa fa-fw fa-wrench",
            navigationItems: [],
        }

        if (this.profileService.hasRouteAccess('quality-control')) {
            control.navigationItems.push(
                {
                    description: "Control Técnico",
                    icon: "fa fa-fw fa-eye",
                    route: "control/quality-control",
                    checked: false,
                },
            );
        }

        if (this.profileService.hasRouteAccess('commercial-control')) {
            control.navigationItems.push(
                {
                    description: "Control Comercial",
                    icon: "fa fa-fw fa-eye",
                    route: "control/commercial-control",
                    checked: false,
                },
            );
        }

        return control;
    }

    private _getLabelItems(): NavbarItem {
        let label: NavbarItem = {
            description: "Etiquetas",
            icon: "fa fa-fw fa-tag",
            navigationItems: [],
        }

        if (this.profileService.hasRouteAccess('labels')) {
            label.navigationItems.push(
                {
                    description: "Reimpresión de etiquetas",
                    icon: "fa fa-fw fa-print",
                    route: "labels/label-printing",
                    checked: false,
                }
            );
        }

        return label;
    }

    private _getOperationsItems(): NavbarItem {
        let operations: NavbarItem = {
            description: "Operaciones",
            icon: "fa fa-fw fa-cog",
            navigationItems: [],
        };

        if (this.profileService.hasRouteAccess('delivery-coordination')) {
            operations.navigationItems.push(
                {
                    description: "Gestión de reservas",
                    icon: "fa fa-fw fa-tasks",
                    route: "operations/delivery-coordination",
                    checked: false,
                },
            );
        }

        return operations;
    }

    private _getNoveltiesItems(): NavbarItem { 
        let novelties: NavbarItem = {
            description: "Novedades",
            icon: "fa fa-fw fa-exclamation-circle",
            navigationItems: [],
        }

        if (this.profileService.hasModuleAccess('current-novelties')) {
            novelties.navigationItems.push(
                {
                    description: "Novedades actuales",
                    icon: "fa fa-fw fa-bell",
                    route: "novelties/current-novelties",
                    checked: false,
                }
            );
        }

        return novelties;
    }

    private _getDevelopmentItems(): NavbarItem {
        let development: NavbarItem = {
            description: "Desarrollo",
            icon: "fa fa-fw fa-bug",
            navigationItems: [],
        };

        if (this.profileService.hasRouteAccess('component-debugging')) {
            development.navigationItems.push(
                {
                    description: "Depuración",
                    icon: "fa fa-fw fa-puzzle-piece",
                    route: "development/component-debugging",
                    checked: false,
                },
            );
        }

        if (this.profileService.hasRouteAccess('zpl')) {
            development.navigationItems.push(
                {
                    description: "ZPL",
                    icon: "fa fa-fw fa-horse-head",
                    route: "development/zpl",
                    checked: false,
                }
            );
        }

        return development;
    }
}
