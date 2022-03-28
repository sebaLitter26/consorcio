import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorizationModule } from "../authorization/authorization.module";
import { AuthorizationGuard } from "../authorization/guards/authorization-guard.service";

const routes: Routes = [
    /*
    {
        path: 'reports',
        loadChildren: () => import ('./reports/reports.module').then(m => m.ReportsModule),
        canActivateChild: [ AuthorizationGuard ],
    },
    {
        path: 'reservations',
        loadChildren: () => import('./reservations/reservations.module').then(m => m.ReservationsModule),
        canActivateChild: [ AuthorizationGuard ],
    },
    {
        path: 'control',
        loadChildren: () => import('./control/control.module').then(m => m.ControlModule),
        canActivateChild: [ AuthorizationGuard ],
    },
    {
        path: 'labels',
        loadChildren: () => import('./labels/labels.module').then(m => m.LabelsModule),
        canActivateChild: [ AuthorizationGuard ],
    },
    {
        path: 'operations',
        loadChildren: () => import('./operations/operations.module').then(m => m.OperationsModule),
        canActivateChild: [ AuthorizationGuard ],
    },
    */
    {
        path: 'development',
        loadChildren: () => import('./development/development.module').then(m => m.DevelopmentModule),
        canActivateChild: [ AuthorizationGuard ],
    },
    {
        path: 'users',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        canActivateChild: [ AuthorizationGuard ],
    },
    {
        path: '',
        redirectTo: '/users',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        AuthorizationModule,
    ],
    exports: [
        RouterModule,
    ],
})
export class RoutesRoutingModule {}
