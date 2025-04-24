import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewSessionEntity } from '../interview_sessions/entities/interview_session.entity';
import { DifficultyLevelsController } from './difficulty_levels.controller';
import { DifficultyLevelsService } from './difficulty_levels.service';
import { DifficultyLevelEntity } from './entities/difficulty_level.entity';
import { DifficultyLevelRepository } from './repositories/difficulty_level.repository';

@Module({
    imports: [TypeOrmModule.forFeature([DifficultyLevelEntity, InterviewSessionEntity])],
    providers: [DifficultyLevelsService, DifficultyLevelRepository],
    exports: [DifficultyLevelsService, DifficultyLevelRepository],
    controllers: [DifficultyLevelsController],
})
export class DifficultyLevelsModule {}
