import { Injectable } from '@nestjs/common';
import { CreateInterviewSessionDto } from './dto/create-interview_session.dto';
import { InterviewSessionEntity } from './entities/interview_session.entity';
import { InterviewSessionRepository } from './repositories/interview_session.repository';

@Injectable()
export class InterviewSessionsService {
    constructor(private readonly interviewSessionRepository: InterviewSessionRepository) {}

    async createV1(userId: number, req: CreateInterviewSessionDto) {
        const { languageId, jobFieldId, interviewCategoryId, difficultyLevelId, method, questionCount } = req;
        const interviewSessionEntity = new InterviewSessionEntity({
            userId,
            languageId,
            jobFieldId,
            interviewCategoryId,
            difficultyLevelId,
            method,
            questionCount,
        });

        return await this.interviewSessionRepository.saveData(interviewSessionEntity);
    }
}
