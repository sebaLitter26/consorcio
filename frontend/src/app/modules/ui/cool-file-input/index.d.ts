export interface CoolFile {
    src: Blob;
    name: string;
    type: string;
    extension?: string;
    progress?: number;
    size: number;
    loaded: number;
}
