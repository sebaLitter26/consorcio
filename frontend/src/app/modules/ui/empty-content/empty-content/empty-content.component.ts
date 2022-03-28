import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-empty-content',
    templateUrl: './empty-content.component.html',
    styleUrls: ['./empty-content.component.scss']
})
export class EmptyContentComponent implements OnInit {

    /** El icono a mostrar en la parte superior. */
    @Input()
    icon: string = "fa fa-fw fa-meh"

    /** El título. Se muestra debajo del icono. */
    @Input()
    title: string = "Tu título va acá"

    /** 
     * El mensaje. Se muestra debajo del título.
     * 
     * Este campo es opcional.
     */
    @Input()
    message: string | null = null;

    constructor() { }

    ngOnInit(): void {
    }

}
