const winston = require('winston');
const { format } = require('logform');
const { colorize, combine, printf, timestamp } = format;

const toUpper = format((info: any, opts: any) => {
  info.level = info.level.toUpperCase();
  return info;
});

export const logger: any = winston.createLogger(<any>{
  level: 'silly',
  transports: [
    new winston.transports.Console({
      format: combine(
        timestamp(),
        toUpper(),
        colorize({ level: true }),
        printf((info: any) => {
          return `${info.timestamp} ${info.level} ${info.label}: ${info.message}`;
        })
      ),
      stderrLevels: ['error'],
    }),
  ],
});

export function getLogger(tagName: string) {
  return logger.child({ label: tagName });
}