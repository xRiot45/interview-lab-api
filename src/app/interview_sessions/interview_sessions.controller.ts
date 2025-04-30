import { Body, Controller, Get, Param, Post, UseGuards, Version } from '@nestjs/common';
import { GetUserId } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserEntity } from '../users/entities/user.entity';
import { CreateInterviewSessionDto } from './dto/create-interview_session.dto';
import { InterviewSessionsService } from './interview_sessions.service';

@Controller('interview-sessions')
export class InterviewSessionsController {
    constructor(private readonly interviewSessionsService: InterviewSessionsService) {}

    @Post()
    @Version('1')
    @UseGuards(JwtAuthGuard)
    async createV1(@GetUserId() user: UserEntity, @Body() req: CreateInterviewSessionDto) {
        return await this.interviewSessionsService.createV1(user.id, req);
    }

    @Get()
    @Version('1')
    @UseGuards(JwtAuthGuard)
    async findAll(@GetUserId() user: UserEntity) {
        return await this.interviewSessionsService.findAll(user.id);
    }

    @Get('/:id')
    @Version('1')
    @UseGuards(JwtAuthGuard)
    async findByIdV1(@GetUserId() user: UserEntity, @Param('id') id: number) {
        return await this.interviewSessionsService.findByIdV1(user.id, id);
    }
}
