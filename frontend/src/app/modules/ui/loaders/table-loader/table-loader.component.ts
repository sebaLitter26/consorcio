import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-table-loader',
    templateUrl: './table-loader.component.html',
    styleUrls: ['./table-loader.component.scss']
})
export class TableLoaderComponent implements OnInit {

    /** La cantidad de columnas de la tabla. Por default son `4`.*/
    @Input()
    columns: number = 4;

    /** La cantidad de filas de la tabla. Por default son `4`.*/
    @Input()
    rows: number = 4;

    /** El ancho total de la tabla. Por default es del `100%`*/
    @Input()
    width: string = "100%";

    /** El radio del borde de la table. Por default es `0px`. */
    @Input()
    borderRadius: string = "0px";

    /** El color de la tabla. Por default es `var(--color-card-background).` */
    @Input()
    backgroundColor: string = "var(--color-card-background)";

    /** El alto de la cabecera. Por default es de `32px`.*/
    @Input()
    headerRowHeight: string = "56px";

    /** El alto de cada fila de datos. Por default es de `24px`.*/
    @Input()
    dataRowHeight: string = "48px";

    /** El padding de las filas. Por default es `10px`. */
    @Input()
    rowPadding: string = "10px";

    /** El color de una celda de datos. Por default es `var(--color-text-fade).` */
    @Input()
    dataCellColor: string = "var(--color-text-fade)";

    /** El color de una celda del header. Por default es `var(--color-card-fade).` */
    @Input()
    headerCellColor: string = "var(--color-card-fade)";

    /** El radio del borde de una celda. Por default es `55px`. */
    @Input()
    cellBorderRadius: string = "55px";

    /** El ancho de las celdas de la cabecera. Por default es del `30%` del ancho de la fila. */
    @Input()
    headerCellWidth: string = "30%";

    /** El ancho de las celdas de datos. Por default es del `50%` del ancho de la fila. */
    @Input()
    dataCellWidth: string = "50%";

    /** El alto de una celda de la cabecera. Por default es `12px` */
    @Input()
    headerCellHeight: string = "12px";

    /** El alto de una celda de datos. Por default es `12px`. */
    @Input()
    dataCellHeight: string = "12px";

    _columns: number[] = [];
    _rows: number[] = [];

    constructor() {}

    ngOnInit(): void {
        for (let i = 0 ; i < this.columns ; i++) {
            this._columns.push(i);
        }

        for (let i = 0 ; i < this.rows ; i++) {
            this._rows.push(i);
        }
    }
}
