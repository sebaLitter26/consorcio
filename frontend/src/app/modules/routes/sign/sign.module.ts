import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../shared.module";
import { CoolInputModule } from "../../ui/cool-input/cool-input.module";
import { CoolDirectivesModule } from "../../ui/cool-input/cool-directives/cool-directives.module";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'in',
        pathMatch: 'full',
    },
    {
        path: "in",
        component: SignInComponent,
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        SharedModule,
        CoolInputModule,
        CoolDirectivesModule,
    ],
    declarations: [
        SignInComponent,
    ],
    providers: []
})
export class SignModule {}