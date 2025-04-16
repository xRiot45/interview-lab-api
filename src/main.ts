import { NestFactory } from '@nestjs/core';
import { winstonLogger } from './configs/winston.config';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { MainModule } from './main.module';

async function bootstrap() {
    const app = await NestFactory.create(MainModule, {
        cors: true,
        logger: winstonLogger,
    });

    app.useGlobalInterceptors(new TransformInterceptor());
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
