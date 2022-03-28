import { NgModule, Type } from "@angular/core";
import { DeviceService } from "src/app/modules/ui/device/services/device.service";
import { SharedModule } from "../../shared.module";
import { DesktopDirective } from "./directives/desktop/desktop.directive";
import { MobileDirective } from "./directives/mobile/mobile.directive";

const directives: Type<any>[] = [
    MobileDirective,
    DesktopDirective,
];

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: directives,
    exports: directives,
    providers: [
        DeviceService,
    ]
})
export class DeviceModule {}