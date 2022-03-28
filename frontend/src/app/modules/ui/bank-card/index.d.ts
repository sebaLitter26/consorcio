/** Estructura de configuración de una tarjeta. */
export interface BankCardConfiguration {
    logo: string;
    height: string;
    backgroundColor: string;
    backgroundImage: string;
}

/** El tipo de tarjeta. */
export type BankCardType = "visa" | "mastercard";