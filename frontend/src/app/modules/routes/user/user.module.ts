import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SerialService } from 'src/app/services/serial.service';
import { ZPLService } from 'src/app/services/zpl.service';
import { SharedModule } from '../../shared.module';
import { CoolDirectivesModule } from '../../ui/cool-input/cool-directives/cool-directives.module';
import { DashboardCardModule } from '../../ui/dashboard-card/dashboard-card.module';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {
        path: 'profile',
        component: ProfileComponent,
    },
    {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
    }
]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        CoolDirectivesModule,
        DashboardCardModule,
    ],
    declarations: [
        ProfileComponent,
        ProfileDetailComponent,
    ],
    providers: [
        ZPLService,
        SerialService
    ]
})
export class UserModule { }
