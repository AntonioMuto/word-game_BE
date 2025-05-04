const { createLogger, format, transports } = require('winston');
const httpContext = require('express-http-context');
const path = require('path');

const logFormat = format.printf((info) => {
    const reqId = httpContext.get('reqId') || 'N/A';
    return `${info.timestamp} [reqId: ${reqId}] ${info.level.toUpperCase()}: ${info.message}`;
});

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: path.join(__dirname, 'logs', 'errors.log'),
            level: 'error'
        })
    ]
});

module.exports = logger;
