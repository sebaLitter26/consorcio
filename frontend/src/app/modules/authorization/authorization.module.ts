import { NgModule, Type } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NavbarModule } from "../navbar/navbar.module";
import { SharedModule } from "../shared.module";
import { CoolDirectivesModule } from "../ui/cool-input/cool-directives/cool-directives.module";
import { AuthorizationDialogComponent } from "./authorization-dialog/authorization-dialog.component";
import { AuthorizationDirective } from "./directives/authorization/authorization.directive";
import { AuthorizationGuard } from "./guards/authorization-guard.service";
import { AuthorizationService } from "./services/authorization.service";

const directives: Type<any>[] = [
    AuthorizationDirective,
    AuthorizationDialogComponent,
];

@NgModule({
    imports: [
        SharedModule,
        NavbarModule,
        ReactiveFormsModule,
        CoolDirectivesModule,
    ],
    declarations: directives,
    exports: directives,
    providers: [
        AuthorizationGuard,
        AuthorizationService,
    ]
})
export class AuthorizationModule {}