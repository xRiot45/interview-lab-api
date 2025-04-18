import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { winstonLogger } from './configs/winston.config';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { MainModule } from './main.module';

async function bootstrap() {
    const app = await NestFactory.create(MainModule, {
        cors: true,
        logger: winstonLogger,
    });

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );
    app.use(cookieParser());
    app.useGlobalInterceptors(new TransformInterceptor());
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
