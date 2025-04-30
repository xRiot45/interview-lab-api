import { Inject } from '@nestjs/common';
import { Repository } from 'src/decorators/repository.decorator';
import { BaseRepository } from 'src/repositories/base.repository';
import { DataSource } from 'typeorm';
import { InterviewSessionEntity } from '../entities/interview_session.entity';
import { IInterviewSessionRepository } from './interview_session.repository-interface';

@Repository(InterviewSessionEntity)
export class InterviewSessionRepository
    extends BaseRepository<InterviewSessionEntity>
    implements IInterviewSessionRepository
{
    constructor(@Inject(DataSource) dataSource: DataSource) {
        super(InterviewSessionEntity, dataSource);
    }
    async saveData(interviewSession: InterviewSessionEntity): Promise<InterviewSessionEntity | null> {
        const savedInterviewSession = await this.save(interviewSession);
        const result = await this.findOne({
            where: { id: savedInterviewSession.id },
            relations: ['user', 'language', 'jobField', 'interviewCategory', 'difficultyLevel'],
        });

        return result;
    }

    async findAll(userId: number): Promise<InterviewSessionEntity[]> {
        return await this.find({
            where: { userId },
            relations: ['user', 'language', 'jobField', 'interviewCategory', 'difficultyLevel'],
        });
    }
}
