import { Directive, ViewContainerRef } from '@angular/core';

/**
 * Directiva utilizada en `DynamicTableComponent` para indicar a un host `CustomCellComponent`
 */
@Directive({
    selector: '[customCellHost]',
})
export class CustomCellDirective {
    constructor (
        public viewContainerRef: ViewContainerRef
    ) {}
}