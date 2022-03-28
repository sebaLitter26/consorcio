import { NgModule, Type } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { CoolFileInputComponent } from './cool-file-input/cool-file-input.component';
import { FileSizePipe } from "./pipes/file-size.pipe";
import { IsImagePipe } from "./pipes/is-image.pipe";

const components: Type<any>[] = [
    CoolFileInputComponent,
];

const pipes: Type<any>[] = [
    IsImagePipe,
    FileSizePipe,
];

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        ...components,
        ...pipes,
    ],
    providers: [
        ...pipes,
    ],
    exports: [
        ...components,
    ]
})
export class CoolFileInputModule {}