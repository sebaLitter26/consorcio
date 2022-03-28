import { Injectable } from '@angular/core';

/**
 * Un punto en un espacio de 2 dimensiones.
 */
export interface TwoDimensionalPoint {
    x: number;
    y: number;
}

@Injectable({
    providedIn: 'root'
})
export class MathService {

    constructor() { }

    /**
     * Devuelve un número aleatorio entre 2 dos valores
     * @param min el valor mínimo
     * @param max el valor máximo
     */
    randBetween(min: number, max: number): number {
        let randomNum: number = Math.random() * (max - min) + min;
        return randomNum;
    }

    /**
     * Calcula la diferencia en porcentaje entre dos valores
     * @param value1 el primer valor
     * @param value2 el segundo valor
     * @returns {number}    un valor entre 0 y 1 que representa el porcentaje del segundo valor respecto del primer valor
     */
    getPercentage(value1: number, value2: number): number {
        return 1 - (value2 / value1);
    }

    /**
     * Devuelve el valor `y` de una recta para un valor `x` dado. Se deben enviar dos puntos correspondientes a la recta
     * para la cual se quiere obtener el valor. Estos puntos son arrays de la forma [px, py].
     * @param p1 array que contiene el primer punto de la recta
     * @param p2 array que contiene el segundo punto de la recta
     * @param x el valor de `x`
     * @returns el valor de `y` para el `x` dado
     */
    getValueForFunctionByPoints(p1: number[], p2: number[], x: number): number {
        return ((p2[1] - p1[1])/(p2[0] - p1[0])) * (x - p1[0]) + p1[1];
    }
}
