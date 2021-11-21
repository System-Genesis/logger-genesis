import { scopeOption } from './types';

export default class LoggerGenesis {
    private system;

    private service;

    private logQueueName;

    private winstonLogger;

    initialize(system: string, service: string, uri: string, logQueueName: string, retryOptions?: any): void;

    private createWinstonLogger;

    private static connectToMenashMQ;

    private sendLogToQueue;

    logInfo(local: boolean, title: string, scope: scopeOption, message: string, extraFields?: any): void;

    logWarn(local: boolean, title: string, scope: scopeOption, message: string, extraFields?: any): void;

    logError(local: boolean, title: string, scope: scopeOption, message: string, extraFields?: any): void;
}
// # sourceMappingURL=logger.d.ts.map
