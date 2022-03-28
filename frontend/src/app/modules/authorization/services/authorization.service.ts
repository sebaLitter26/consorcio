import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, of } from "rxjs";
import { delay, switchMap, tap } from "rxjs/operators";
import { EncryptService } from "../../../services/encrypt.service";
import { environment } from "../../../../environments/environment";
import { PermissionAuthorizationPayload } from "..";
import { ProfileService } from "../../main/services/profile.service";
import { AuthorizationDialogComponent } from "../authorization-dialog/authorization-dialog.component";

const LOGIN_API_RESOURCE: string = "login";

@Injectable()
export class AuthorizationService {

    constructor(
        private http: HttpClient,
        private matDialog: MatDialog,
        private encryptService: EncryptService,
        private profileService: ProfileService,
    ) {}

    /**
     * Intenta ejecutar una tarea que requiere de autorización.
     * En caso de que el usuario no tenga autorización para ejecutar dicha tarea,
     * se abre el pop-up de autorización para elevar el permiso asociado y ejecutar la tarea.
     * 
     * Si el pop-up se cierra sin ingresar las credenciales, la tarea no se ejecuta.
     * 
     * @param permission el permiso
     * @param callback la tarea a ejecutar a modo de callback
     */
    authorizeTask(permission: string, callback: () => void): void {
        // Si el usuario ya tiene permiso para ejecutar la tarea, se ejecuta
        // Caso contrario, se solicita elevación
        if (this.profileService.hasPermission(permission)) {
            callback();
        } else {
            this.matDialog.open(AuthorizationDialogComponent, {
                width: "650px",
                data: {
                    permission: permission,
                }
            }).afterClosed().subscribe(result => {
                if (result) {
                    callback();
                }
            });
        }
    }

    /**
     * Eleva un permiso a un usuario que normalmente no lo tiene disponible.
     * @param username el usuario al cual elevar el permiso
     * @param adminUsername el usuario administrador
     * @param adminPassword la password del usuario administrador
     * @param permission el permiso a elevar
     * @returns un `Observable` con la respuesta del servicio
     */
    authorizeUser(username: string, adminUsername: string, adminPassword: string, permission: string): Observable<any> {
        const payload: PermissionAuthorizationPayload = {
            user: username,
            permiso: permission,
            legajo: adminUsername,
            password: "",
        }

        return this.encryptService.getBase64EncryptedStringAsync(adminPassword).pipe(
            tap(encryptedPassword => {
                payload.password = ''+encryptedPassword;
            }),
            switchMap(encryptedPassword => this.http.post(`${environment.apiUrl}${LOGIN_API_RESOURCE}/elevarPermisos`, payload)),
        );
    }
}