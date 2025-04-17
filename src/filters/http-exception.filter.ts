import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { Filters } from 'src/decorators/filters.decorator';

interface ExceptionResponse {
    message: string;
}

@Filters(HttpException)
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

        response.status(status).json({
            status: false,
            message,
            timestamp: new Date().toISOString(),
            path: `${process.env.APP_URL}${request.url}`,
        });
    }
}
