import { NgModule, Type } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { EmptyContentComponent } from "./empty-content/empty-content.component";

const components: Type<any>[] = [
    EmptyContentComponent,
];

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: components,
    exports: components,
})
export class EmptyContentModule {}