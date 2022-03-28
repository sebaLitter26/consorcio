import { NgModule, Type } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { BankCardComponent } from "./bank-card/bank-card.component";

const components: Type<any>[] = [
    BankCardComponent,
]

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: components,
    exports: components,
})
export class BankCardModule {}