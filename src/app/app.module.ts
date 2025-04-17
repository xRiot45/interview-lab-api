import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RequestLoggerMiddleware } from 'src/middlewares/request-logger.middleware';
import { RoleModule } from './role/role.module';

@Module({
    imports: [RoleModule],
    controllers: [],
    providers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestLoggerMiddleware).forRoutes('/');
    }
}
