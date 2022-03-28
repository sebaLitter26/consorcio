import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavbarService } from '../../navbar/services/navbar.service';
import { OverlayService } from '../../overlay/services/overlay.service';
import { StationConfigurationService } from '../../station-configuration/services/configuration.service';
import { StationConfigDialogComponent } from '../../station-configuration/station-config-dialog/station-config-dialog.component';
import { ConfirmationDialogComponent } from '../../ui/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ProfileService } from '../services/profile.service';
import { VersionService } from '../services/version.service';
import { StationConfiguration } from '../../station-configuration'
import { SnackBarService } from 'src/app/services/snackbar.service';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AppTheme } from 'src/app/app-theme.enum';
import { AppThemeService } from 'src/app/app-theme.service';
import { environment } from 'src/environments/environment';
import { SandboxService } from 'src/app/services/sandbox.service';
import { AuthorizationService } from '../../authorization/services/authorization.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    /** Flag que indica si la barra de navegación está abierta. */
    navbarIsOpen: boolean | null = null;

    numberRef = Number;

    environment = environment;

    /** La versión actual de la Web de SIGE */
    webVersion$: Observable<string> = this.versionService.getWebVersion();

    /** La versión actual de la API de SIGE */
    apiVersion$: Observable<string> = this.versionService.getApiVersion();

    /** La versión actual de las interfaces de SIGE */
    interfacesVersion$: Observable<string> = this.versionService.getInterfacesVersion();

    stationConfig: StationConfiguration | null = null;

    @ViewChild('themeToggle', { static: true })
    themeToggle: MatSlideToggle | null = null;

    constructor(
        public profileService: ProfileService,
        public versionService: VersionService,
        private navbarService: NavbarService,
        private router: Router,
        private matDialog: MatDialog,
        //private stationConfigurationService: StationConfigurationService,
        private overlayService: OverlayService,
        private snackBarService: SnackBarService,
        private appThemeService: AppThemeService,
        public sandboxService: SandboxService,
        private authorizationService: AuthorizationService,
    ) {}

    ngOnInit(): void {
        if (!environment.production && !environment.preProduction) {
            this.sandboxService.sandBoxModeEvent.subscribe(mode => {
                if (mode != null && mode != undefined) {
                    localStorage.setItem("sandbox_mode", mode.toString());
                    this.snackBarService.open(`Modo Sandbox ${mode ? 'ACTIVADO' : 'DESACTIVADO'}`, "Aceptar", 5000, "warning-snackbar");
                }
            });
        }

        this.navbarService.toggleEvent.subscribe((open: boolean) => {
            this.navbarIsOpen = open;
        });
    }

    /**
    * Abre y cierra la barra de navegación.
    */
    toggleNavbar() {
        this.navbarService.toggle();
    }

    /**
     * Cierra la sesión actual.
     */
    logout(): void {
        let dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.matDialog.open(ConfirmationDialogComponent, {
            data: {
                title: "Cerrar sesión",
                message: "Se cerrará la sesión ¿Desea continuar?",
                color: "accent",
            }
        });

        dialogRef.afterClosed().subscribe(data => {
            if (data) {
                this.router.navigate(['sign/in']);
            }
        });
    }

    /**
     * Abre el menú de configuración de la estación de trabajo.
     */
     openStationConfiguration(): void {
        const permission: string = "station_edit-configuration";
        const _openStationConfiguration: () => void = () => {
            this.overlayService.displayLoadingOverlay();
            this.stationConfigurationService.getStationConfig().subscribe(
                (stationConfig: StationConfiguration) => {
                    this.overlayService.hideLoadingOverlay();
                    this.stationConfig = stationConfig;

                    let matDialogRef: MatDialogRef<StationConfigDialogComponent> = this.matDialog.open(StationConfigDialogComponent, {
                        width: "700px",
                        data: stationConfig,
                        panelClass: ['no-padding-panel', 'l-height-panel'],
                        // panelClass: 'l-height-panel',
                    });

                    matDialogRef.afterClosed().subscribe(
                        (result: StationConfiguration) => {
                            if (result) {
                                this.matDialog.open(ConfirmationDialogComponent, {
                                    data: {
                                        title: "Guardar nueva configuración",
                                        message: "Se ha detectado una nueva configuración de la estación. Para guardar los cambios, se recargará la página ¿Desea continuar?",
                                        color: "accent",
                                    }
                                }).afterClosed().subscribe(confirmationResult => {
                                    if (confirmationResult) {
                                        this.overlayService.displayLoadingOverlay();
                                        this.stationConfigurationService.saveStationConfig(result).subscribe(
                                            result => {
                                                this.overlayService.hideLoadingOverlay();
                                                this.snackBarService.open("¡Configuración guardada! Recargando página...", "Aceptar", 5000, "success-snackbar");
                                                location.reload();
                                            },
                                            error => {
                                                this.overlayService.hideLoadingOverlay();
                                            }
                                        );

                                        this.stationConfig = result;
                                    }
                                });
                            }
                        }
                    );
                },
                error => {
                    this.overlayService.hideLoadingOverlay();
                    this.stationConfig = null;
                    this.snackBarService.open("ERROR: Servicio de configuración no disponible", "Aceptar", 5000, "error-snackbar");
                }
            );
        }

        this.authorizationService.authorizeTask(permission, _openStationConfiguration);
    }

    /**
     * Cambia el esquema de colores entre claro y oscuro
     */
    toggleColorTheme() {
        this.appThemeService.setColorTheme(this.themeToggle?.checked ? AppTheme.APP_LIGHT : AppTheme.APP_DARK);
    }

    /**
     * Activa a desactiva el modo Sandbox
     */
     toggleSandboxMode(): void {
        this.sandboxService.toggleSandboxMode();
    }
}
