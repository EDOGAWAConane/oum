export class FileUpload {
    key: string;
    name: string;
    url: string;
    file: File;
    email: string;
    constructor(file: File) {
        this.file = file;
    }
}
