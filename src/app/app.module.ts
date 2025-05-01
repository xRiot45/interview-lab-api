import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RequestLoggerMiddleware } from 'src/middlewares/request-logger.middleware';
import { AuthModule } from './auth/auth.module';
import { DifficultyLevelsModule } from './difficulty_levels/difficulty_levels.module';
import { InterviewCategoriesModule } from './interview_categories/interview_categories.module';
import { InterviewSessionsModule } from './interview_sessions/interview_sessions.module';
import { JobFieldsModule } from './job_fields/job_fields.module';
import { LanguagesModule } from './languages/languages.module';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';
import { InterviewQuestionsModule } from './interview_questions/interview_questions.module';

@Module({
    imports: [
        RoleModule,
        UsersModule,
        AuthModule,
        InterviewCategoriesModule,
        JobFieldsModule,
        DifficultyLevelsModule,
        LanguagesModule,
        InterviewSessionsModule,
        InterviewQuestionsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestLoggerMiddleware).forRoutes('/');
    }
}
