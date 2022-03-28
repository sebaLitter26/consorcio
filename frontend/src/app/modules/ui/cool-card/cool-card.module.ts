import { NgModule, Type } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { CoolCardComponent } from "./cool-card/cool-card.component";

const components: Type<any>[] = [
    CoolCardComponent,
];

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: components,
    exports: components,
})
export class CoolCardModule {}