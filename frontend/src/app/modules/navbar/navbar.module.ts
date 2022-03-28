import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar/navbar.component";
import { SharedModule } from "../shared.module";
import { NavbarService } from "./services/navbar.service";
import { OverlayModule } from "@angular/cdk/overlay";
import { DeviceModule } from "../ui/device/device.module";
@NgModule({
    imports: [
        SharedModule,
        OverlayModule,
        DeviceModule,
    ],
    declarations: [
        NavbarComponent,
    ],
    exports: [
        NavbarComponent,
    ],
    providers: [
        NavbarService,
    ]
})
export class NavbarModule {}