/** Datos del usuario que se encuentra logueado actualmente. */
export interface User {
    id: number;
    nombre: string;
    legajo: string;
    perfil: string;
    password: string;
    token: string;
    fotoUrl: string;
    qr?: string;
    permisos: string[];
}
