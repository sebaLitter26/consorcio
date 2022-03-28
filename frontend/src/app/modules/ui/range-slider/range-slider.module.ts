import { NgModule, Type } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { RangeSliderComponent } from "./range-slider/range-slider.component";

const components: Type<any>[] = [
    RangeSliderComponent,
];

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: components,
    exports: components,
})
export class RangeSliderModule {}