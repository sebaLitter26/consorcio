import { NgModule, Type } from "@angular/core";
import { SharedModule } from "../shared.module";
import { OverlayLoadingComponent } from "./overlay-loading/overlay-loading.component";
import { OverlayTransparentComponent } from "./overlay-transparent/overlay-transparent.component";

const components: Type<any>[] = [
    OverlayLoadingComponent,
    OverlayTransparentComponent,
];

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: components,
    exports: components,
})
export class OverlayModule {}