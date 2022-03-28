import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSlider, MatSliderChange } from '@angular/material/slider';

@Component({
    selector: 'app-range-slider',
    templateUrl: './range-slider.component.html',
    styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent implements OnInit {

    /** El valor mínimo aceptable por el slider. */
    @Input()
    minValue: number = 1;

    /** El valor máximo aceptable por el slider. */
    @Input()
    maxValue: number = 100000;

    /** El valor inicial del slider izquierdo. */
    @Input()
    leftValue: number = 25000;

    /** El valor inicial del slider derecho. */
    @Input()
    rightValue: number = 75000;

    /** El valor de los intervalos del slider.  */
    @Input()
    step: number = 1;

    /** El slider del extremo izquierdo. */
    @ViewChild("leftSlider")
    private readonly _leftSlider: MatSlider | null = null;

    /** El slider del extremo derecho. */
    @ViewChild("rightSlider")
    private readonly _rightSlider: MatSlider | null = null;

    _leftSliderValue: number | null = null;

    _rightSliderValue: number | null = null;

    constructor() {
        this._leftSliderValue = this.leftValue;
        this._rightSliderValue = this.rightValue;
    }

    ngOnInit(): void { }

    onLeftValueChange($event: MatSliderChange): void {
        this._leftSliderValue = $event.value;

        if (this._rightSlider) {
            this._rightSlider.min = <number>$event.value;
        }
    }

    onRightValueChange($event: MatSliderChange): void {
        this._rightSliderValue = $event.value;

        if (this._leftSlider) {
            this._leftSlider.max = <number>$event.value;
        }
    }
}
