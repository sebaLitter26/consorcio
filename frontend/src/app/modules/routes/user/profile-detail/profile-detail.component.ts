import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';
import { ProfileService } from 'src/app/modules/main/services/profile.service';
import { OverlayService } from 'src/app/modules/overlay/services/overlay.service';
import { SerialService } from 'src/app/services/serial.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { ZPLService } from 'src/app/services/zpl.service';
import { CustomCard, Empleado, QrAction } from '..';
const CUSTOM_CARD_MAP: CustomCard<Empleado>[] = [
  {
    header: 'Antigüedad',
    icon: 'fas fa-clock',
    prop: 'AntiguedadEmpresa',
    color: 'var(--color-accent)',
  },
  {
    header: 'Sector',
    icon: 'fas fa-briefcase',
    prop: 'Sector',
    color: '#EA6AFF',
  }
]
@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {

  @Input() empleado: Empleado[] | null = null;

  mapRef = CUSTOM_CARD_MAP;
  qrAction!: QrAction;
  qrActionButton!: string;

  constructor(
    private overlayService: OverlayService,
    private serialPortService: SerialService,
    private zplService: ZPLService,
    private profileService: ProfileService,
    private snackBarService: SnackBarService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.setQrActionState();
  }
  /**
   * Imprime QR.
   */
  printMyQR() {

    this.overlayService.displayLoadingOverlay();
    /**Accedemos al SerialService para imprimir el QR. Para eso, pasamos el token de usuario. */

    this.authenticationService[this.qrAction]().pipe(
      switchMap((qr: any) =>
      this.serialPortService.printZPL(this.zplService.generateUserQR(qr.qr, this.profileService.user.nombre)),
      ),
      tap((response) => {},
      (err) => {
        //En caso de que falle la impresión o que la estación no esté configurada, entrará acá
        let errMessage = "Por favor, compruebe que la impresora esté conectada y/o que la estación esté configurada.";
        this.setQrActionState(true);
        this.snackBarService.open(errMessage, "Aceptar", 5000, "error-snackbar");
      }),

    ).subscribe((success) => {
    /** En caso correcto, se le informará al usuario y el QR será impreso */
    this.setQrActionState(success);
    this.overlayService.hideLoadingOverlay();
    this.snackBarService.open(`¡Impreso con éxito!`, "Aceptar", 5000, "success-snackbar");
  },
    ((err) => {
      /** En caso de error por parte del servidor, el QR no será impreso */
      this.overlayService.hideLoadingOverlay();
      if (err.error.codigo == "702") {
        this.router.navigate(['sign/in']);
      }
    })
  )
  }
  /**
   * Setea las características que debe tener el botón de impresión de acuerdo al estado dado.
   * @param success Opcional, en caso de que sea la primera vez que se genera el QR, es requerido.
   */
  setQrActionState(success?: any) {
    if(success || this.profileService.user.qr) {
      this.qrAction = 'reprintQR';
      this.qrActionButton = "Reimprimir QR";

    } else {
      this.qrAction = 'getFirstQR';
      this.qrActionButton = "Generar mi QR";

    }
  }

}
