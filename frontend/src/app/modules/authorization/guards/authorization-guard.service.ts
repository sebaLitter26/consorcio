import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { SnackBarService } from "src/app/services/snackbar.service";
import { ProfileService } from "../../main/services/profile.service";
import { NavbarService } from "../../navbar/services/navbar.service";

@Injectable()
export class AuthorizationGuard implements CanActivateChild {

    constructor(
        private router: Router,
        private navbarService: NavbarService,
        private profileService: ProfileService,
        private snackBarService: SnackBarService,
    ) {}

    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const pageRoute: string = state.url.split("/")[2]; // Ejemplo, de 'localhost/reports/operation-state', obtendria 'operation-state'
        const navbarItemsLength: number = this.navbarService.getNavbarItems().length;

        if (this.profileService.hasRouteAccess(pageRoute)) {
            return true;
        }

        if (navbarItemsLength <= 0) {
            this.snackBarService.open(`El usuario no tiene ningún permiso asignado`, "Aceptar", 7000, "error-snackbar");
        }

        // En caso de no tener permisos de acceso a la ruta, redirijo a la primer ruta que tenga disponible el usuario
        this.router.navigate([navbarItemsLength > 0 ? this.navbarService.getNavbarItems()[0].navigationItems[0].route : 'sign/in']);
        return false;
    }
}