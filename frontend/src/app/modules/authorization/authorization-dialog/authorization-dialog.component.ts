import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { ProfileService } from '../../main/services/profile.service';
import { OverlayService } from '../../overlay/services/overlay.service';
import { AuthorizationService } from '../services/authorization.service';

@Component({
    selector: 'app-authorization-dialog',
    templateUrl: './authorization-dialog.component.html',
    styleUrls: ['./authorization-dialog.component.scss']
})
export class AuthorizationDialogComponent {

    credentialsFormGroup: FormGroup = new FormBuilder().group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
    });

    constructor(
        private authorizationService: AuthorizationService,
        private profileService: ProfileService,
        public dialogRef: MatDialogRef<AuthorizationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { permission: string },
        private snackBarService: SnackBarService,
        private overlayService: OverlayService,
    ) {}

    /**
     * Valida las credenciales del usuario administrador.
     */
    validateAdminUser(): void {
        if (this.credentialsFormGroup.valid) {
            this.overlayService.displayLoadingOverlay();
            this.authorizationService.authorizeUser(
                this.profileService.user.legajo,
                this.credentialsFormGroup.get('username')?.value,
                this.credentialsFormGroup.get('password')?.value,
                this.data.permission,
            ).subscribe(
                result => {
                    this.overlayService.hideLoadingOverlay();
                    this.dialogRef.close(true);
                    this.snackBarService.open("Usuario autorizado", "Aceptar", 5000, "success-snackbar");
                },
            );
        } else {
            this.snackBarService.open("AVISO: Debe ingresar usuario y contraseña", "Aceptar", 7500, "warning-snackbar");
        }
    }
}
