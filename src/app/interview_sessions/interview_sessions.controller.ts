import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InterviewSessionsService } from './interview_sessions.service';
import { CreateInterviewSessionDto } from './dto/create-interview_session.dto';
import { UpdateInterviewSessionDto } from './dto/update-interview_session.dto';

@Controller('interview-sessions')
export class InterviewSessionsController {
    constructor(private readonly interviewSessionsService: InterviewSessionsService) {}

    @Post()
    create(@Body() createInterviewSessionDto: CreateInterviewSessionDto) {
        return this.interviewSessionsService.create(createInterviewSessionDto);
    }

    @Get()
    findAll() {
        return this.interviewSessionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.interviewSessionsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateInterviewSessionDto: UpdateInterviewSessionDto) {
        return this.interviewSessionsService.update(+id, updateInterviewSessionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.interviewSessionsService.remove(+id);
    }
}
