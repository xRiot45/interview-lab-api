import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RequestLoggerMiddleware } from 'src/middlewares/request-logger.middleware';

@Module({
    imports: [],
    controllers: [],
    providers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    }
}
