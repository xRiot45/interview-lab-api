import { Controller } from '@nestjs/common';
import { InterviewQuestionsService } from './interview_questions.service';

@Controller('interview-questions')
export class InterviewQuestionsController {
    constructor(private readonly interviewQuestionsService: InterviewQuestionsService) {}
}
