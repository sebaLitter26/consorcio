import { NgModule, Type } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { SelectionChipsComponent } from "./selection-chips/selection-chips.component";

const components: Type<any>[] = [
    SelectionChipsComponent,
];

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: components,
    exports: components,
})
export class SelectionChipsModule {}