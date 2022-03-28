import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CoolFile } from '..';
import { FileSizePipe } from '../pipes/file-size.pipe';
import { IsImagePipe } from '../pipes/is-image.pipe';
import { SnackBarService } from '../../../../services/snackbar.service';


@Component({
    selector: 'app-cool-file-input',
    templateUrl: './cool-file-input.component.html',
    styleUrls: ['./cool-file-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoolFileInputComponent implements OnInit {
    
    /** El alto del componente. */
    @Input()
    height: string = "300px";

    /** El tamaño máximo del total de archivos permitido, en bytes. */
    @Input()
    maxTotalSize: number | null = null;

    /** Flag que indica si se debe mostar el input para subir archivos. */
    @Input()
    showFilesInput: boolean = true;

    /** Flag que indica si se debe mostrar el listado de archivos subidos. */
    @Input()
    showFilesList: boolean = true;

    /** Flag que indica si se debe permitir quitar archivos de la lista. */
    @Input()
    allowFilesRemoval: boolean = true;

    /** Array que indica que extenciones de archivos son permitidos en la lista. */
    @Input()
    allowFilesExtensions: string = ".jpg,.jpeg,.png,.txt,.doc,.docx";

    /** Numero que indica que tamaño de archivos son permitidos en la lista. */
    @Input()
    allowMaxFileSize: number = 1000000; //1MB

    @Output()
    finalizaCarga = new EventEmitter<Object>();

    files: CoolFile[] = [];

    constructor(
        private isImagePipe: IsImagePipe,
        private fileSizePipe: FileSizePipe,
        private changeDetectorRef: ChangeDetectorRef,
        private snackBarService: SnackBarService,
    ) {}

    ngOnInit(): void {}

    /**
     * Elimina un archivo del array de archivos.
     * @param index la posición del archivo dentro del array de archivos
     */
    removeFile(index: number): void {
        this.files.splice(index, 1);
    }

    /**
     * Handler del evento `change` del input de archivos que se dispara cuando el usuario selecciona un archivo a subir.
     * 
     * Se encarga de llenar el array `files` con los archivos que el usuario haya seleccionado y emite los eventos correspondientes al componente padre.
     * 
     * @param $event el evento
     */
    _handleFilesChange($event: Event): void {
        const newFiles: FileList | null = (<HTMLInputElement>$event.target).files;

        if (!newFiles) {
            return;
        }

        for (let i = 0 ; i < newFiles.length ; i++) {
            const currentFile: File | null = newFiles.item(i);
            if(currentFile && this.validateFiles(currentFile)) {
                from(newFiles.item(i)?.arrayBuffer()!).pipe(
                    tap((buffer: ArrayBuffer) => {

                        const fileReader = new FileReader();
                        const fileSrc: Blob = new Blob([buffer]);

                        fileReader.onloadstart = (event: ProgressEvent<FileReader>) => {
                            const fileIndex: number = this.files.findIndex(file => file.name == currentFile?.name);
                            const coolFile: CoolFile = {
                                src: fileSrc,
                                name: <string>currentFile?.name,
                                type: <string>currentFile?.type,
                                extension: currentFile?.name.substring(currentFile?.name.lastIndexOf("."), currentFile?.name.length),
                                progress: (event.loaded / event.total) * 100,
                                size: event.total,
                                loaded: event.loaded,
                            }

                            if (fileIndex < 0) {
                                this.files.push(coolFile);
                            } else {
                                this.files[fileIndex] = coolFile;
                            }

                            this.changeDetectorRef.detectChanges();
                        };

                        fileReader.onprogress = (event: ProgressEvent<FileReader>) => {
                            const fileIndex: number = this.files.findIndex(file => file.name == currentFile?.name);

                            this.files[fileIndex].progress = (event.loaded / event.total) * 100;
                            this.files[fileIndex].loaded = event.loaded;

                            this.changeDetectorRef.detectChanges();
                        };

                        fileReader.onloadend = (event: ProgressEvent<FileReader>) => {
                            if(this.files.every( (val, i, arr) => val.progress === 100 )){
                                this.finalizaCarga.emit(this.files);
                            }
                        };

                        fileReader.readAsArrayBuffer(fileSrc);
                    }),
                ).subscribe();
            }
        }
       
    }

    validateFiles(file: File): boolean {
        let valid = true;
        if(file.size >= this.allowMaxFileSize) {
            this.snackBarService.open(`Files of maximum ${Math.round(this.allowMaxFileSize/1024/1024)} MB`, "Aceptar", 5000, "error-snackbar");
            valid = false;
        }
        if(this.allowFilesExtensions.indexOf(file.name.replace(/.*\./, '').toLocaleLowerCase())< 0) {
            this.snackBarService.open(`Only ${this.allowFilesExtensions} extensions allowed`, "Aceptar", 5000, "error-snackbar");
            valid = false;
        }
        return valid;
    }
}
