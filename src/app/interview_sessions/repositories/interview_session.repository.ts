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
    async saveData(interviewSession: InterviewSessionEntity): Promise<InterviewSessionEntity> {
        return await this.save(interviewSession);
    }
}
