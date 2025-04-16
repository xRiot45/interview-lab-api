import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

interface ExceptionResponse {
    message: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger();

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = exception.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;
        const exceptionResponse = exception.getResponse() as ExceptionResponse;

        let message = 'Internal server error';
        if (typeof exceptionResponse === 'string') {
            message = exceptionResponse;
        } else if (typeof exceptionResponse === 'object' && exceptionResponse.message) {
            message = exceptionResponse.message;
        }

        this.logger.error(`[${request.method}] ${request.url} - ${message}`, exception.stack);

        response.status(status).json({
            status: 'error',
            message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
