import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared.module";
import { CoolInputComponent } from "./cool-input/cool-input.component";

const components = [
    CoolInputComponent,
]

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
    ],
    declarations: components,
    exports: components,
})
export class CoolInputModule {}