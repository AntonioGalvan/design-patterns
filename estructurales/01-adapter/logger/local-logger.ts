export class LocalLogger {
    constructor(private file: string) { }

    writeLog(msg: string): void {
        console.log(`Log: [${this.file}] ${msg}`);
    }

    writeError(msg: string): void {
        console.error(`Error: [${this.file}] ${msg}`);
    }

    writeWarning(msg: string): void {
        console.warn(`Warning: [${this.file}] ${msg}`);
    }
}