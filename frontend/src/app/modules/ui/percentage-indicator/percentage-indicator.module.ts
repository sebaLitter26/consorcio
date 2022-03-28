import { NgModule, Type } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { PercentageIndicatorComponent } from "./percentage-indicator.component";

const components: Type<any>[] = [
    PercentageIndicatorComponent,
];

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: components,
    exports: components,
})
export class PercentageindicatorModule {}
