import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger(RequestLoggerMiddleware.name);

    use(req: Request, res: Response, next: NextFunction) {
        const requestId = uuidv4();
        req['requestId'] = requestId;

        const start = Date.now();
        const userAgent = req.headers['user-agent'];
        const timestamp = new Date().toISOString();
        const referer = req.headers['referer'] || req.headers['origin'];
        const duration = Date.now() - start;
        const statusCode = res.statusCode;
        const reasonPhrase = getReasonPhrase(statusCode);
        const method = req.method;
        const url = req.url;
        const ip = req.ip;

        // Optional: Geolocation logging (if you use a service like ipinfo.io)
        const geoLocation = req.headers['x-forwarded-for'] || 'Not Found';

        res.on('finish', () => {
            const logMessage = `[Timestamp ${timestamp}] [RequestID: ${requestId}] [${method}] ${url} - ${statusCode} ${reasonPhrase} - IP: ${ip} - GeoLocation: ${geoLocation} - UserAgent: ${userAgent} - Duration: ${duration}ms - Referer: ${referer}`;

            if ([401, 403, 404, 405, 409, 500].includes(statusCode)) {
                this.logger.error(logMessage);
            } else {
                this.logger.log(logMessage);
            }
        });

        next();
    }
}
