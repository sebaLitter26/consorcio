import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../shared.module";
import { BankCardModule } from "../../ui/bank-card/bank-card.module";
import { CoolCardModule } from "../../ui/cool-card/cool-card.module";
import { CoolInputModule } from "../../ui/cool-input/cool-input.module";
import { RangeSliderModule } from "../../ui/range-slider/range-slider.module";
import { ComponentDebuggingComponent } from './component-debugging/component-debugging.component';

const routes: Routes = [
    {
        path: 'component-debugging',
        component: ComponentDebuggingComponent,
    },
    {
        path: '',
        redirectTo: 'component-debugging',
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        BankCardModule,
        RangeSliderModule,
        CoolCardModule,
        ReactiveFormsModule,
        CoolInputModule,
    ],
    declarations: [
      ComponentDebuggingComponent,
    ],
})
export class DevelopmentModule {}