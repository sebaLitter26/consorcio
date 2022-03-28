import { Injectable } from "@angular/core";
import { from, Observable, of } from "rxjs";
import { switchMap, tap } from "rxjs/operators";

const PEM_PUBLIC_KEY: string = "-----BEGIN PUBLIC KEY-----" +
"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwlG/yuC748z8uf9lvjt5" +
"rlF/9xi/bdHQ3EXOyIQU30HgkFz+xYjehVBVy6RvPV6UM+AxbTVUWHUmraY6hmsJ" +
"/oeAlO6ukDXTT8v30BsLZ0PpN95DfI67cCUbc0R2xrusRMc7EaGArehMHRKP3Bho" +
"enS7LfTRdtZfc4vbq4Vj5RyXDolfW2d1HVG635sIFY+VdjIdlldxI6EOG3Lx+PvT" +
"x5U/jH0R38PqzSnXC5qCwz0FzBP5X8yMowQDQB67Cm0JP1ffJ4rhdXBmGOQXCa8C" +
"KXlTTUJrBLJtR04BkU/r7wP+C+DCuvUgNlkRNrJCugcCA1mJvIPD4CCxDT3H7wzX" +
"VwIDAQAB" +
"-----END PUBLIC KEY-----";

@Injectable({
    providedIn: 'root',
})
export class EncryptService {
    
    constructor() {}

    /**
     * Toma un texto plano y devuelve un texto encriptado como un `string` en base64.
     * @param plainText el texto a encriptar (plaintext)
     * @returns el texto en base64 encriptado con RSA (cyphertext)
     */
    getBase64EncryptedStringAsync(plainText: string): Observable<string> {
        return from(import('node-forge')).pipe(
            switchMap(forge => of(window.btoa(forge.pki.publicKeyFromPem(PEM_PUBLIC_KEY).encrypt(plainText))))
        );
    }
}