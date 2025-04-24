import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewSessionEntity } from '../interview_sessions/entities/interview_session.entity';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, InterviewSessionEntity])],
    providers: [UsersService, UsersRepository],
    exports: [UsersService, UsersRepository],
    controllers: [UsersController],
})
export class UsersModule {}
