import { Pipe, PipeTransform } from "@angular/core";

const FILE_SIZE_UNITS: string[] = ["B", "KB", "MB", "GB", "TB"];

@Pipe({
    name: "appFileSize"
})
export class FileSizePipe implements PipeTransform {
    
    constructor() {}

    transform(bytes: number, ...args: any[]) {
        let transformedValue: number = bytes;

        for (let unit of FILE_SIZE_UNITS) {
            if (transformedValue < 1024) {
                return `${transformedValue} ${unit}`;
            }

            transformedValue = Number.parseFloat((transformedValue / 1024).toFixed(2));
        }

        return transformedValue;
    }
}