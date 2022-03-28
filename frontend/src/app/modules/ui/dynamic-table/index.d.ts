/** Definición de la estructura de una tabla dinámica. */
export interface DynamicTableDefinition {
    /** Las columnas a mostrar en la tabla. */
    displayedColumns: string[];
    /** El valor a mostrar en cada celda del header de la tabla. */
    headerCellDefinitions: string[];
}

/** Interfaz a implementar por cada componente que funcione a modo de detalle para las filas de `DynamicTableComponent` */
export interface ItemDetailComponent {
    data: any;
}

/** Interfaz a implementar por cada componente que funcione a modo celda custom de `DynamicTableComponent` */
export interface CustomCellComponent {
    data: any;
}

/** Valor de una columna a buscar en una fila. */
export interface DynamicTableSearchItem {
    value: number | string;
    column: string;
}

export interface DynamicTableGroupingHeader {
    columnNames: string[];
    columnSpans: number[];
}