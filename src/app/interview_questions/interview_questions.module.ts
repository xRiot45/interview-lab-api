import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewQuestionEntity } from './entities/interview_question.entity';
import { InterviewQuestionsController } from './interview_questions.controller';
import { InterviewQuestionsService } from './interview_questions.service';

@Module({
    imports: [TypeOrmModule.forFeature([InterviewQuestionEntity])],
    controllers: [InterviewQuestionsController],
    providers: [InterviewQuestionsService],
})
export class InterviewQuestionsModule {}
