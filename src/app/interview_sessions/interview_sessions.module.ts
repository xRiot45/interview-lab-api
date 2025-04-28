import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewSessionEntity } from './entities/interview_session.entity';
import { InterviewSessionsController } from './interview_sessions.controller';
import { InterviewSessionsService } from './interview_sessions.service';
import { InterviewSessionRepository } from './repositories/interview_session.repository';

@Module({
    imports: [TypeOrmModule.forFeature([InterviewSessionEntity])],
    controllers: [InterviewSessionsController],
    providers: [InterviewSessionsService, InterviewSessionRepository],
    exports: [TypeOrmModule],
})
export class InterviewSessionsModule {}
