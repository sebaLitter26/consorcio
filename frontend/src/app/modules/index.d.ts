/** Un proceso dentro del circuito de armado de una reserva. */
export type Process = "compra" | "picking";

/** El estado de un `Process`. */
export type ProcessState = "ok" | "nok" | "wip" | "hold";

export interface SIGEResponse {
    data: any;
    status: ResponseStatus;
    errorMessage?: string;
}

export type ResponseStatus = "ok" | "error";

export interface ProcessStateStyle {
    label: string;
    color: string;
    backgroundColor: string;
}
