import { NgModule } from '@angular/core';
import { DashboardCardComponent } from './dashboard-card.component';
import { SharedModule } from '../../shared.module';

const components = [
    DashboardCardComponent,
]
@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
export class DashboardCardModule { }
