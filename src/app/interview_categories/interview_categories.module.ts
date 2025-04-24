import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewSessionEntity } from '../interview_sessions/entities/interview_session.entity';
import { InterviewCategoryEntity } from './entities/interview_category.entity';
import { InterviewCategoriesController } from './interview_categories.controller';
import { InterviewCategoriesService } from './interview_categories.service';
import { InterviewCategoriesRepository } from './repositories/interview_categories.repository';

@Module({
    imports: [TypeOrmModule.forFeature([InterviewCategoryEntity, InterviewSessionEntity])],
    providers: [InterviewCategoriesService, InterviewCategoriesRepository],
    exports: [InterviewCategoriesService, InterviewCategoriesRepository],
    controllers: [InterviewCategoriesController],
})
export class InterviewCategoriesModule {}
