import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "appIsImage",
})
export class IsImagePipe implements PipeTransform {

    constructor() {}

    transform(fileType: string, ...args: any[]): boolean {
        return fileType.split("/")[0] == "image";
    }
}