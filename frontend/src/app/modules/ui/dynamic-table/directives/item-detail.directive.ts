import { Directive, ViewContainerRef } from '@angular/core';

/**
 * Directiva utilizada en `DynamicTableComponent` para indicar a un host `ItemDetailComponent`
 */
@Directive({
    selector: '[itemDetailHost]',
})
export class ItemDetailDirective {
    constructor (
        public viewContainerRef: ViewContainerRef
    ) {}
}