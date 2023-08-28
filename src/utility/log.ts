
import * as winston from 'winston';

const { format, transports } = winston;
const { combine, label, timestamp, printf } = format;

const logger = winston.createLogger({
    format: combine(
        label(),
        timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
        printf(({ level, message, timestamp }) =>
            `${timestamp} [${level.toUpperCase()}]: ${message}`)
    ),
    transports: [
        new transports.File({
            filename: 'log/app.txt'
        }),
        new transports.Console({
            format: format.prettyPrint({ colorize: true })
        })
    ]
});

export { logger };