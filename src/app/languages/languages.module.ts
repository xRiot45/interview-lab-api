import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewSessionEntity } from '../interview_sessions/entities/interview_session.entity';
import { LanguageEntity } from './entities/language.entity';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';
import { LanguageRepository } from './repositories/languages.repository';

@Module({
    imports: [TypeOrmModule.forFeature([LanguageEntity, InterviewSessionEntity])],
    providers: [LanguagesService, LanguageRepository],
    controllers: [LanguagesController],
    exports: [LanguagesService, LanguageRepository],
})
export class LanguagesModule {}
