import menash from 'menashmq';
import * as winston from 'winston';
import { scopeOption, levelOptions, logObject } from './types';

export default class LoggerGenesis {
    private system: string;

    private service: string;

    private logQueueName: string;

    private winstonLogger: winston.Logger;

    public async initialize(
        system: string,
        service: string,
        uri: string,
        logQueueName: string,
        createMenashRabbitMQConnection: boolean,
        retryOptions?: any,
    ) {
        this.system = system;
        this.service = service;
        this.logQueueName = logQueueName;

        this.createWinstonLogger();

        if (createMenashRabbitMQConnection) await LoggerGenesis.connectToRabbitMQ(uri, retryOptions);

        if (menash.isReady) await this.declareQueue();
    }

    private createWinstonLogger() {
        const { config, format } = winston;
        this.winstonLogger = winston.createLogger({
            levels: config.npm.levels,

            format: format.combine(
                format.colorize(),
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                format.splat(),
                format.simple(),
            ),
            transports: [new winston.transports.Console()],
        });
    }

    private async declareQueue() {
        await menash.declareQueue(this.logQueueName);
    }

    private static async connectToRabbitMQ(uri: string, retryOptions: any = {}) {
        await menash.connect(uri, retryOptions);
    }

    private sendLogToQueue(level: levelOptions, title: string, scope: scopeOption, message: string, extraFields: any) {
        const logToSend: logObject = {
            level,
            title,
            scope,
            system: this.system,
            service: this.service,
            message,
            '@timeStamp': Date.now(),
            ...extraFields,
        };

        menash.send(this.logQueueName, logToSend);
    }

    public logInfo(local: boolean, title: string, scope: scopeOption, message: string, extraFields?: any) {
        if (!local) this.sendLogToQueue('info', title, scope, message, extraFields);
        this.winstonLogger.info(`${title} => ${message}`);
    }

    public logWarn(local: boolean, title: string, scope: scopeOption, message: string, extraFields?: any) {
        if (!local) this.sendLogToQueue('warn', title, scope, message, extraFields);
        this.winstonLogger.warn(`${title} => ${message}`);
    }

    public logError(local: boolean, title: string, scope: scopeOption, message: string, extraFields?: any) {
        if (!local) this.sendLogToQueue('error', title, scope, message, extraFields);
        this.winstonLogger.error(`${title} => ${message}`);
    }
}
