import { Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Middleware } from 'src/decorators/middleware.decorator';

@Middleware()
export class RequestLoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger(RequestLoggerMiddleware.name);

    use(req: Request, res: Response, next: NextFunction) {
        this.logger.log(`[${req.method}] ${req.url}`);

        res.on('finish', () => {
            const statusCode = res.statusCode;
            if ([401, 403, 404, 405, 409].includes(statusCode)) {
                this.logger.error(`[${req.method}] ${req.url} - ${statusCode}`);
            } else {
                this.logger.log(`[${req.method}] ${req.url} - ${statusCode}`);
            }
        });

        next();
    }
}
