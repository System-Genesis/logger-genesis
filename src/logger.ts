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
        logQueueName: string,
        createMenashRabbitMQConnection: boolean,
        uri?: string,
        retryOptions?: any,
    ): Promise<void> {
        this.system = system;
        this.service = service;
        this.logQueueName = logQueueName;

        this.createWinstonLogger();

        if (createMenashRabbitMQConnection) await LoggerGenesis.connectToRabbitMQ(uri!, retryOptions);

        if (menash.isReady) await this.declareQueue();
        else throw new Error(`Can't find rabbitMQ to connect`);
    }

    private createWinstonLogger(): void {
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

    private async declareQueue(): Promise<void> {
        await menash.declareQueue(this.logQueueName, { durable: true });
    }

    private static async connectToRabbitMQ(uri: string, retryOptions: any = {}): Promise<void> {
        await menash.connect(uri, retryOptions);
    }

    private sendLogToQueue(level: levelOptions, title: string, scope: scopeOption, message: string, extraFields: any): void {
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

        menash.send(this.logQueueName, logToSend, { persistent: true });
    }

    public info(sendToQueue: boolean, scope: scopeOption, title: string, message: string, extraFields?: any): void {
        if (sendToQueue) this.sendLogToQueue('info', title, scope, message, extraFields);
        this.winstonLogger.info(`${title} => ${message}`);
    }

    public warn(sendToQueue: boolean, scope: scopeOption, title: string, message: string, extraFields?: any): void {
        if (sendToQueue) this.sendLogToQueue('warn', title, scope, message, extraFields);
        this.winstonLogger.warn(`${title} => ${message}`);
    }

    public error(sendToQueue: boolean, scope: scopeOption, title: string, message: string, extraFields?: any): void {
        if (sendToQueue) this.sendLogToQueue('error', title, scope, message, extraFields);
        this.winstonLogger.error(`${title} => ${message}`);
    }
}
