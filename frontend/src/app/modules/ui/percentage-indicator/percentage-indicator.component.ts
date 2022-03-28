import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

export type PercentageColorClass = 'accent' | 'primary' | 'warn' | 'red' | 'yellow' | 'green' | 'pink' | 'purple' | 'deep-purple' | 'indigo' | 'teal' | 'lime' | 'orange' | 'deep-orange' | 'brown' | 'gray' | 'blue-gray'

@Component({
  selector: 'app-percentage-indicator',
  templateUrl: './percentage-indicator.component.html',
  styleUrls: ['./percentage-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PercentageIndicatorComponent implements OnInit {

    @Input()
    colorClass: PercentageColorClass = 'accent';
    @Input()
    description: string | null = null;
    @Input()
    value: number | null = null;
    @Input()
    percentage: number = 0;
    @Input()
    strokeWidth: number = 16;
    @Input()
    diameter: number = 48;

    constructor() { }

    ngOnInit(): void {
    }
}
