import { Logger } from 'jsr:@deno-library/logger'

interface ILoggerAdapter {
    file: string;

    writeLog(msg: string): void;
    writeError(msg: string): void;
    writeWarning(msg: string): void;
}

export class LoggerAdapter implements ILoggerAdapter {
    private logger = new Logger();
    public file: string;

    constructor(file: string) { 
        this.file = file;
    }

    writeLog(msg: string): void {
        this.logger.info(`[${this.file}] ${msg}`);
    }

    writeError(msg: string): void {
        this.logger.error(`[${this.file}] ${msg}`);
    }

    writeWarning(msg: string): void {
        this.logger.warn(`[${this.file}] ${msg}`);
    }
}
// const logger = new Logger();

// logger.info("This is an info message.");
// logger.error("This is an error message.");
// logger.warn("This is a warning message.");