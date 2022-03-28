import { NgModule, Type } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { TableLoaderComponent } from "./table-loader/table-loader.component";

const components: Type<any>[] = [
    TableLoaderComponent,
];

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: components,
    exports: components,
})
export class LoadersModule {}