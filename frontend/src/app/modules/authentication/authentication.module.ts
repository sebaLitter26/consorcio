import { NgModule } from "@angular/core";
import { SharedModule } from "../shared.module";
import { CoolDirectivesModule } from "../ui/cool-input/cool-directives/cool-directives.module";
import { ExpiredSessionDialogComponent } from "./expired-session-dialog/expired-session-dialog.component";
import { AuthenticationGuardService } from "./guards/authentication-guard.service";
import { AuthenticationService } from "./services/authentication.service";

@NgModule({
    imports: [
        SharedModule,
        CoolDirectivesModule,
    ],
    providers: [
        AuthenticationGuardService,
        AuthenticationService,
    ],
    declarations: [
        ExpiredSessionDialogComponent,
    ]
})
export class AuthenticationModule {}