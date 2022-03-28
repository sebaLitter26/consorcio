import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class VersionService {

    constructor(
        private http: HttpClient,
    ) {}

    /**
     * Obtiene la versión actual de la web de SIGE.
     * @returns un `Observable` con la versión en formato `string`
     */
    getWebVersion(): Observable<string> {
        return of(environment.version);
    }

    /**
     * Obtiene la versión actual de la API de SIGE.
     * @returns un `Observable` con la versión formato `string`
     */
    getApiVersion(): Observable<string> {
        return this.http.get<string>(`${environment.apiUrl}getVersion`);
    }

    /**
     * Obtiene la versión actual de la API de interfaces
     * @returns un `Observable` con la versión formato `string`
     */
    getInterfacesVersion(): Observable<string> {
        return this.http.get<string>(`${environment.apiInterfaceUrl}getVersion`);
    }
}