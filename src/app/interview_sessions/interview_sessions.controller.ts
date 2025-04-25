import { Body, Controller, Post } from '@nestjs/common';
import { CreateInterviewSessionDto } from './dto/create-interview_session.dto';
import { InterviewSessionsService } from './interview_sessions.service';

@Controller('interview-sessions')
export class InterviewSessionsController {
    constructor(private readonly interviewSessionsService: InterviewSessionsService) {}

    @Post()
    create(@Body() createInterviewSessionDto: CreateInterviewSessionDto) {
        return this.interviewSessionsService.create(createInterviewSessionDto);
    }
}
