import { Injectable } from '@angular/core';

/**
 * Servicio con utilidades para archivos de Excel.
 */
@Injectable()
export class XLSXService {

    constructor() {}

    /**
     * Parsea un objeto y lo exporta a un archivo `.xlsx`
     * @param _xlsx referencia al módulo de `xlsx`. Se utiliza code-splitting para reducir el tamaño del bundle final en los módulos que importen a `XLSXService`, ya que `xlsx` no es tree-shakeable
     * @param data el objeto
     * @param fileName el nombre del archivo
     */
    exportJSON(_xlsx: any, data: any, fileName: string): void {
        const worksheet = _xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };

        _xlsx.writeFile(workbook, fileName);
    }
}
