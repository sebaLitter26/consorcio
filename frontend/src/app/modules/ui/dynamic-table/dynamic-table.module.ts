import { NgModule, Type } from "@angular/core";
import { FormsModule } from "@angular/forms";
//import { HashService } from "../../../services/hash.service";
//import { UtilsService } from "../../../services/utils.service";
import { NavbarModule } from "../../navbar/navbar.module";
import { SharedModule } from "../../shared.module";
import { CustomCellDirective } from "./directives/custom-cell.directive";
import { ItemDetailDirective } from "./directives/item-detail.directive";
import { DynamicTableComponent } from "./dynamic-table/dynamic-table.component";

const components: Type<any>[] = [
    DynamicTableComponent,
];

const directives: Type<any>[] = [
    CustomCellDirective,
    ItemDetailDirective,
];

@NgModule({
    imports: [
        SharedModule,
        NavbarModule,
        FormsModule,
    ],
    declarations: [...components, ...directives],
    exports: [...components],
})
export class DynamicTableModule {}