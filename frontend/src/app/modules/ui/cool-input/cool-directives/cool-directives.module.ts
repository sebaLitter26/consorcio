import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RoundButtonDirective } from "./round-button/round-button.directive";

const directives = [
    RoundButtonDirective,
];

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: directives,
    exports: directives,
})
export class CoolDirectivesModule {}