import { Component, OnInit, Input } from '@angular/core';

const BOTTOM_POSITION_FACTOR: number = 96 / -1 // 96px icon size, -2rem (-32px) right position
const LEFT_POSITION_FACTOR: number = 96 / -2 // 96px icon size, -1rem (-16px) left position

@Component({
    selector: 'app-dashboard-card',
    templateUrl: './dashboard-card.component.html',
    styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {

    /** El valor numérico a mostrar. */
    @Input()
    value: string = "Valor de la tarjeta";
    /** La descripción semántica del valor mostrado. */
    @Input()
    description: string = "Descripción de la tarjeta";
    /** El color de la tarjeta. Se aplica el mismo color con una opacidad del 40% al icono. */
    @Input()
    color: string = "var(--color-primary)";
    /** El icono a mostrar. Este parámetro es opcional. */
    @Input()
    icon: string = "fa fa-fw fa-4x fa-smile";

    /** El tamaño de la fuente a usar en el valor. */
    @Input()
    valueSize: string = "24px";
    /** El tamaño de la fuente a usar en la descripción. */
    @Input()
    descriptionSize: string = "16px";
    /** El tamaño del icono. */
    @Input()
    iconSize: string = "96px";

    bottomPoisitionFactor: number = BOTTOM_POSITION_FACTOR;
    leftPositionFactor: number = LEFT_POSITION_FACTOR;
    numberIconSize: number = Number.parseInt(this.iconSize.split("p")[0]);

    constructor() {}

    ngOnInit(): void {}
}
