import { NgModule, Type } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { CoolStepperComponent } from './cool-stepper/cool-stepper.component';

const components: Type<any>[] = [
    CoolStepperComponent,
];

@NgModule({
    imports: [
        SharedModule,
    ],
    exports: components,
    declarations: components,
})
export class CoolStepperModule {}