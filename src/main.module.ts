import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppModule } from './app/app.module';
import { DatabaseModule } from './databases/database.module';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ThrottlerModule.forRoot([
            {
                ttl: 60,
                limit: 1000,
            },
            {
                ttl: 3600,
                limit: 10000,
            },
            {
                ttl: 86400,
                limit: 100000,
            },
        ]),
        AppModule,
        DatabaseModule,
    ],
})
export class MainModule {}
