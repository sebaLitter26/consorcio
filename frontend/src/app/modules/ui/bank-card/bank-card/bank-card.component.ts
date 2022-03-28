import { Component, Input, OnInit } from '@angular/core';
import { BankCardConfiguration, BankCardType } from '..';

/** Mapa que indica para cada dígito inicial de la tarjeta, a que tipo de tarjeta corresponde. */
const CARD_TYPE_MAP: { [ key: number ]: BankCardType } = {
    4: "visa",
    5: "mastercard",
}

@Component({
    selector: 'app-bank-card',
    templateUrl: './bank-card.component.html',
    styleUrls: ['./bank-card.component.scss']
})
export class BankCardComponent implements OnInit {

    /** El número de la tarjeta. */
    @Input()
    cardNumber: string = "4555555555555555";

    /** Clase de elevación de material. */
    @Input()
    elevationClass: string = "mat-elevation-z0";

    /** 
     * Mapa con la configuración de estilos para cada tipo de tarjeta.
     * Esta estructura es para uso interno del componente y no debería usarse por fuera.
     */
    readonly _cardsConfigurationMap: { [ keys in BankCardType ]: BankCardConfiguration } = {
        visa: {
            logo: "../../../../../assets/bank-cards/logos/visa-color.png",
            backgroundColor: "#ba68c8",
            height: "22.5px",
            backgroundImage: "../../../../../assets/bank-cards/backgrounds/polygons-purple.svg"
        },
        mastercard: {
            logo: "../../../../../assets/bank-cards/logos/mastercard-color.png",
            backgroundColor: "#ff7043",
            height: "20px",
            backgroundImage: "../../../../../assets/bank-cards/backgrounds/polygons-orange.svg"
        },
    }

    /** 
     * Una matriz que contiene los números de la tarjeta agrupados de a 4 dígitos. 
     * Este valor para uso interno del componente y no debería usarse por fuera.
    */
    readonly _cardNumbers: string[] = [];

    /** 
     * El tipo de tarjeta.
     * Este valor es para uso interno del componente y no debería usarse ni modificarse por fuera.
     */
    _cardType: BankCardType | null = null;

    constructor() { }

    ngOnInit(): void {
        this._cardType = CARD_TYPE_MAP[Number.parseInt(this.cardNumber.charAt(0))];

        this._fillCardNumbers();

        console.log(this._cardNumbers);
    }

    private _fillCardNumbers(): void {
        let currentNumber: string = "";

        for (let i = 0 ;  i < this.cardNumber.length ; i++) {
            

            if (currentNumber.length == 4) {
                this._cardNumbers.push(currentNumber);
                currentNumber = i >= 6 && i <= 11 ? '*' : this.cardNumber.charAt(i);
            } else {
                currentNumber += i >= 6 && i <= 11 ? '*' : this.cardNumber.charAt(i);
            }
        }

        this._cardNumbers.push(currentNumber);
    }
}
