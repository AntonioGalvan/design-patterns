//Adapter: Permite que objetos con interfaces incompatibles trabajen juntos.
//útil para usar librerías de terceros sin depender directamente de ellas.

//import { LocalLogger } from "./local-logger.ts";
import { LoggerAdapter } from "./logger-adapter.ts";

const logger = new LoggerAdapter("01-adapter.ts");

logger.writeLog("This is a log message.");
logger.writeError("This is an error message.");
logger.writeWarning("This is a warning message.");