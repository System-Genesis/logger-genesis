import LoggerGenesis from './logger';
import { scopeOption, levelOptions } from './types';

const logger: LoggerGenesis = new LoggerGenesis();

export default logger;

export { LoggerGenesis };

export { scopeOption, levelOptions };
