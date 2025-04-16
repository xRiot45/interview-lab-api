import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export const winstonLogger = WinstonModule.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
        new winston.transports.File({
            filename: 'logs/combined.log',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
                winston.format.splat(),
                winston.format.timestamp(),
                winston.format.printf((info) => {
                    return `${info.timestamp} ${info.level}: ${info.message}`;
                }),
            ),
        }),
    ],
});
