import { Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Middleware } from 'src/decorators/middleware.decorator';

@Middleware()
export class RequestLoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger();

    use(req: Request, res: Response, next: NextFunction) {
        res.on('finish', () => {
            const statusCode = res.statusCode;
            if ([401, 403, 404, 405, 409].includes(statusCode)) {
                this.logger.warn(`[${req.method}] ${req.url} - ${statusCode}`);
            }
        });

        next();
    }
}
