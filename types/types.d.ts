export declare type scopeOption = 'APP' | 'SYSTEM';
export declare type levelOptions = 'info' | 'warn' | 'error';
export declare type logObject = {
    level: string;
    title: string;
    scope: string;
    system: string;
    service: string;
    message: string;
    '@timeStamp': number;
    extraFields?: any;
};
