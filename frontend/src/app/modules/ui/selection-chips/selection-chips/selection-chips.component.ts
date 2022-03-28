import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/** Un chip de selección, con su valor y su estado. */
interface SelectionChip {
    value: any;
    selected: boolean;
}

/**
 * Componente de lista con botones de selección.
 * 
 * Se puede parametrizar con datos primitivos o con objetos (en el caso de los objetos será necesario proveer el nombre
 * de la propiedad a mostrar en los botones).
 * 
 * También es posible la selección múltiple, para lo cual hay que proveer el flag correspondiente.
 * 
 * Opcionalmente puede pasarse una lista con los índices de los valores seleccionados por defecto, los cuales se seleccionarán
 * automáticamente al cargarse el componente.
 * 
 * 
 * ## Ejemplos
 * 
 * @example
 * 
 *  <!-- Lista de valores primitivos -->
 *  <app-selection-chips
        [options]="[5, 4, 3, 2]"
        [defaultSelected]="[0, 1, 2]"
        [multiSelection]="true"
        (selectionEvent)="onQuantitySelection($event)"
    >
    </app-selection-chips>
 * 
 *  <!-- Lista de objetos -->
 *  <app-selection-chips
        [options]="[{nombre:'alan', dni: 39111333}, {nombre:'poe', dni: 29123321}]"
        [defaultSelected]="[0]"
        [multiSelection]="false"
        [displayKey]="nombre"
        (selectionEvent)="onQuantitySelection($event)"
    >
    </app-selection-chips>
 */
@Component({
    selector: 'app-selection-chips',
    templateUrl: './selection-chips.component.html',
    styleUrls: ['./selection-chips.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionChipsComponent implements OnInit {
    /** Las opciones de la lista de selección. */
    @Input()
    options: any[] = [];
    /** El índice del elemento seleccionado por default. */
    @Input()
    defaultSelected: number[] = [];
    /** Indica si se puede seleccionar más de un item. */
    @Input()
    multiSelection: boolean = false;
    /** La propiedad que se utilizará para mostrar en cada opción de la lista. */
    @Input()
    displayKey: string | null = null;
    /** Emite los elementos que se han seleccionado. */
    @Output()
    selectionEvent: EventEmitter<any> = new EventEmitter<any>();

    /** Estructura que mantiene la lista de opciones junto con un flag que indica si está seleccionada. */
    _selectionList: SelectionChip[] = [];

    constructor() {}

    ngOnInit(): void {
        for (let i = 0 ; i < this.options.length ; i++) {
            this._selectionList.push({
                value: this.options[i],
                selected: this.multiSelection ? this.defaultSelected.includes(i) : i == this.defaultSelected[0],
            });
        }
    }

    /**
     * Emite la selección actual.
     * @param option la opción seleccionada
     */
    setSelection(option: SelectionChip): void {
        option.selected = !option.selected;

        if (this.multiSelection) {
            let _currentSelection: any[] = [];

            // En el caso de selección multiple, meto en un array los elementos seleccionados y los emito
            for (let i = 0 ; i < this._selectionList.length ; i++) {
                if (this._selectionList[i].selected) {
                    _currentSelection.push(this._selectionList[i].value);
                }
            }

            this.selectionEvent.emit(_currentSelection.length > 0 ? _currentSelection : null);
        } else {
            // En el caso de selección única, deselecciono todos los elementos y luego emito el elemento seleccionado
            for (let i = 0 ; i < this._selectionList.length ; i++) {
                if (this._selectionList[i].value != option.value) {
                    this._selectionList[i].selected = false;
                }
            }

            this.selectionEvent.emit(option.selected ? option.value : null);
        }
    }
}
