import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RequestLoggerMiddleware } from 'src/middlewares/request-logger.middleware';
import { AuthModule } from './auth/auth.module';
import { InterviewCategoriesModule } from './interview_categories/interview_categories.module';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';
import { JobFieldsModule } from './job_fields/job_fields.module';
import { DifficultyLevelsModule } from './difficulty_levels/difficulty_levels.module';

@Module({
    imports: [RoleModule, UsersModule, AuthModule, InterviewCategoriesModule, JobFieldsModule, DifficultyLevelsModule],
    controllers: [],
    providers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestLoggerMiddleware).forRoutes('/');
    }
}
