import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewSessionEntity } from '../interview_sessions/entities/interview_session.entity';
import { JobFieldEntity } from './entities/job_field.entity';
import { JobFieldsController } from './job_fields.controller';
import { JobFieldsService } from './job_fields.service';
import { JobFieldsRepository } from './repositories/job_fields.repository';

@Module({
    imports: [TypeOrmModule.forFeature([JobFieldEntity, InterviewSessionEntity])],
    providers: [JobFieldsService, JobFieldsRepository],
    exports: [JobFieldsService, JobFieldsRepository],
    controllers: [JobFieldsController],
})
export class JobFieldsModule {}
