import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AuthenticationGuardService } from './modules/authentication/guards/authentication-guard.service';

const routes: Routes = [
    {
        path: 'sign',
        loadChildren: () => import('./modules/routes/sign/sign.module').then(m => m.SignModule),
    },
    {
        path: '',
        loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
        canActivate: [ AuthenticationGuardService ],
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        AuthenticationModule,
    ],
    exports: [
        RouterModule,
    ],
})
export class AppRoutingModule { }
