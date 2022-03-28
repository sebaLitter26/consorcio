export type QrAction = "reprintQR" | "getFirstQR";


export interface CustomCard<T> {
    header: string;
    icon: string;
    prop: keyof T;
    color: string;
}



export interface Empleado {
    Foto: string;
    NombreApellido: string;
    Funcion: string;
    AntiguedadEmpresa: string;
    AntiguedadPuesto: string;
    CentroDescripcion: string;
    Division: string;
    FechaPuesto: string;
    Legajo: string;
    Posicion: string;
    Sector: string;
}
