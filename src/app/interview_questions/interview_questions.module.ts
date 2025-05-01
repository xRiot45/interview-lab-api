import { Module } from '@nestjs/common';
import { InterviewQuestionsService } from './interview_questions.service';
import { InterviewQuestionsController } from './interview_questions.controller';

@Module({
    controllers: [InterviewQuestionsController],
    providers: [InterviewQuestionsService],
})
export class InterviewQuestionsModule {}
