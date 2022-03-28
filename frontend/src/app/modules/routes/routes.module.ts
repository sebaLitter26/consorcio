import { NgModule } from "@angular/core";
import { SharedModule } from "../shared.module";
import { RoutesRoutingModule } from "./routes-routing.module";

@NgModule({
    imports: [
        SharedModule,
        RoutesRoutingModule,
    ],
})
export class RoutesModule {}