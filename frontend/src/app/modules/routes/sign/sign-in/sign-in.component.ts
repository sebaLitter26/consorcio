import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, LOCAL_STORAGE_TOKEN } from 'src/app/modules/authentication/services/authentication.service';
import { User } from 'src/app/modules/main';
import { ProfileService } from 'src/app/modules/main/services/profile.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    /** El usuario. Actualmente se usa el número de legajo. */
    username: string | null = null;

    /** La clave del usuario. */
    password: string | null = null;

    /** Función que se ejecuta al presionar enter al estar enfocado sobre el campo de usuario o contraseña. */
    keyDownCallback: (keyboardEvent: KeyboardEvent) => void = (keyboardEvent) => {
        if (keyboardEvent.key == "Enter") {
            keyboardEvent.preventDefault();
            this.signIn();
        }
    }

    /** Flag que indica si se está realizando una petición. */
    fetching: boolean = false;

    constructor(
        private authenticationService: AuthenticationService,
        private snackBarService: SnackBarService,
        private router: Router,
        private profileService: ProfileService,
    ) {}

    ngOnInit(): void {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        this.profileService.killUser();
    }

    signIn(): void {
        if (this.username && this.password && !this.fetching) {
            this.fetching = true;
            this.authenticationService.signIn(this.username, this.password).subscribe(
                (user: User) => {
                    this.fetching = false;
                    this.router.navigate([""]);
                },
                (error: HttpErrorResponse) => {
                    this.fetching = false;
                    this.snackBarService.open("Error al iniciar sesión", "Aceptar", 5000, "error-snackbar");
                }
            );
        }
    }
}
