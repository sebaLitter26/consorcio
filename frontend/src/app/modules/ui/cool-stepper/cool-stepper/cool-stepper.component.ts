import { Component, Input, OnInit } from '@angular/core';
import { CoolStepperStep } from '..';

@Component({
    selector: 'app-cool-stepper',
    templateUrl: './cool-stepper.component.html',
    styleUrls: ['./cool-stepper.component.scss']
})
export class CoolStepperComponent implements OnInit {

    @Input()
    steps: CoolStepperStep[] = [];

    @Input()
    stepColor: string = "";

    @Input()
    currentStepColor: string = "";

    constructor() { }

    ngOnInit(): void {
    }

}
