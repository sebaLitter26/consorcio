import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent } from 'rxjs';
import { MathService } from 'src/app/services/math.service';
import { CoolInputOption, InputType } from '..';

@Component({
    selector: 'app-cool-input',
    templateUrl: './cool-input.component.html',
    styleUrls: ['./cool-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoolInputComponent implements OnInit, AfterViewInit {

    /** El ancho del input. */
    @Input()
    width: string = "100%";

    /** El color del borde. */
    @Input()
    borderColor: string = "var(--color-border)";

    /** El ancho del borde. */
    @Input()
    borderWidth: string = "0px";

    /** El estilo del borde. */
    @Input()
    borderStyle: string = "solid";

    /** El label a mostrar arriba del input. */
    @Input()
    label: string | null = null;

    /** Un icono de Material que se muestra del lado izquierdo del input en caso de que sea un icono válido. */
    @Input()
    icon: string | null = null;

    /** 
     * El `FormControl` a usar para manejar el input del componente.
     * 
     * Se utiliza en caso de que se quiera trabajar con `ReactiveForms` desde el componente padre, por ejemplo, para agregar Validators.
    */
    @Input()
    inputControl: FormControl = new FormControl();

    /** El placeholder a utilizar en el input. */
    @Input()
    placeholder: string = "Ingrese...";

    /** El tamaño de la fuente del input. */
    @Input()
    fontSize: string = "16px";

    /** El tamaño del icono. */
    @Input()
    iconSize: string = "16px";

    /** El tipo de input. */
    @Input()
    type: InputType = "text";

    /** 
     * Flag que indica si se debe disponer de un toggle para cambiar la visibilidad del valor del input.
     * 
     * Aplica solo para los inputs de tipo `password`.
     */
    @Input()
    usePasswordVisibilityToggle: boolean = true;

    /**
     * Flag que indica si se debe disponer de un botón para limpiar el valor del input.
     * 
     * Por defecto, este valor viene en `false`.
     */
    @Input()
    useClearButton: boolean = false;

    /** Función a ejecutarse luego de mantener presionada una tecla del teclado. */
    @Input()
    onKeyDownCallback: ((keyboardEvent: KeyboardEvent) => void) | null = null;

    /** Indica si se debe poner el foco al input al renderizarse. */
    @Input()
    autoFocus: boolean = false;

    /** 
     * Indica si se debe mantener el foco de forma permanente en el input.
     * 
     * Muy útil cuando se utiliza con escáneres de código de barra.
     */
    @Input()
    permanentFocus: boolean = false;

    /**
     * Listado de opciones para select de opciones.
     */
    @Input()
    options: CoolInputOption[] = [];

    /**
     * El índice de la opción seleccionada por defecto, en caso de que se use una lista de opciones en el input.
     */
    @Input()
    defaultSelectedOptionIndex: number | null = null;

    /**
     * El texto a mostrar en el botón para seleccionar opciones en el input.
     */
    @Input()
    optionsButtonText: string = "Opciones";

    /** 
     * Evento que se dispara cada vez que cambia el valor de `inputControl`.
     * 
     * Emite el último valor de `inputControl` al componente padre.
     */
    @Output()
    valueChanges: EventEmitter<string> = new EventEmitter();

    /**
     * Evento que se dispara cada vez que se selecciona una opción del listado de opciones.
     * 
     * Emite el valor seleccionado en forma de un objeto `CoolInputOption`.
     */
    @Output()
    selectedOption: EventEmitter<CoolInputOption> = new EventEmitter();

    /** Flag que se usa en caso de que el input sea de tipo `password` e indica si el valor del input es visible o no. */
    _passwordIsVisible: boolean = false;

    _id: string = "coolinput";

    _selectedOptionIndex: number | null = null;

    private _permanentFocus: boolean = false;

    constructor(
        private mathService: MathService,
        private matDialog: MatDialog,
    ) {
        this._id += this.mathService.randBetween(1, 1000000).toFixed(0);
    }

    ngOnInit(): void {
        this._permanentFocus = this.permanentFocus;
        this._selectedOptionIndex = this.defaultSelectedOptionIndex;

        // Si se setea el flag `permanentFocus`, se enfoca el input cada vez que se hace click sobre el documento
        fromEvent(document, "click").subscribe((evt: Event) => {
            if (this.permanentFocus) {
                document.getElementById(this._id)?.focus();
            }
        });

        this.inputControl.valueChanges.subscribe(newValue => {
            this.valueChanges.emit(newValue);
        });

        // Si se abre algún `MatDialog`, se quita el foco automático del input para que no interfiera con otros posibles inputs del pop-up
        this.matDialog.afterOpened.subscribe(result => {
            this.permanentFocus = false;
        });

        // Si se cierran todos los `MatDialog`, se reestablece el valor original de `permanentFocus` y, si es `true`, se enfoca el input
        this.matDialog.afterAllClosed.subscribe(result => {
            this.permanentFocus = this._permanentFocus;
            
            setTimeout(() => {
                if (this.permanentFocus) {
                    document.getElementById(this._id)?.focus();
                }
            }, 100);
        });
    }

    ngAfterViewInit(): void {
        if (this.autoFocus || this.permanentFocus) {
            setTimeout(() => {
                document.getElementById(this._id)?.focus();
            }, 100);
        }
    }

    /**
     * Activa o desactiva la visibilidad del valor del input (si es del tipo `password`) de acuerdo al estado actual.
     */
    togglePasswordVisibility(): void {
        this._passwordIsVisible = !this._passwordIsVisible;
        this.type = this._passwordIsVisible ? 'text' : 'password';
    }

    /**
     * Emite la opción seleccionada del listado de opciones.
     * @param optionIndex el índice de la opción en el array
     */
    emitSelectedOption(optionIndex: number): void {
        this._selectedOptionIndex = optionIndex;
        this.selectedOption.emit(this.options[optionIndex]);
    }
}
