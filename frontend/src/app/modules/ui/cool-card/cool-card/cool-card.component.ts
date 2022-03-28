import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cool-card',
  templateUrl: './cool-card.component.html',
  styleUrls: ['./cool-card.component.scss']
})
export class CoolCardComponent implements OnInit {

    /** Color de fondo de la tarjeta. Por defecto es `transparent`. */
    @Input()
    backgroundColor: string = "transparent";

    /** 
     * Color de la tarjeta. Por defecto es el color `primary` del tema de Material.
     * Si se quiere utilizar otro color de la paleta definida para el tema actual, se deben utilizar las variables
     * de CSS correspondientes (ver definiciones en `styles.scss`).
     */
    @Input()
    color: string = "var(--color-primary)";

    /** Radio del borde de la tarjeta. Por defecto es de `12px`. */
    @Input()
    borderRadius: string = '12px';

    /** Ancho del borde de la tarjeta. Por defecto es de `5px`. */
    @Input()
    borderWidth: string = '5px';

    /** Clases de `Fontawesome` correspondiente al icono a mostrar en la tarjeta. Por defecto son `"fa fa-fw fa-4x fa-smile"`.*/
    @Input()
    icon: string = 'fa fa-fw fa-4x fa-smile';

    /** Descripción a mostrar en la tarjeta. Por defecto es `"Descripción de la tarjeta"`. */
    @Input()
    description: string = 'Descripción de la tarjeta';

    /** El tamaño de la fuente de la descripción. Por defecto es de `24px`. */
    @Input()
    fontSize: string = "24px";

    /** El padding de la tarjeta. Por defecto es de `24px`. */
    @Input()
    padding: string = "24px";

    /** Clase de elevación de material para la tarjeta. Por defecto es `mat-elevation-z4`. */
    @Input()
    elevationClass: string = "mat-elevation-z4"

    /** El alto de la tarjeta. Por defecto es 'fit-content'. */
    @Input()
    height: string = "fit-content";

    /** El ancho de la tarjeta. Por defecto es 'fit-content'. */
    @Input()
    width: string = "fit-content";

    /** Evento que emite el valor `true` cuando se clickea la tarjeta. */
    @Output()
    readonly onClick: EventEmitter<true> = new EventEmitter<true>();

    constructor() { }

    ngOnInit(): void { }
}
