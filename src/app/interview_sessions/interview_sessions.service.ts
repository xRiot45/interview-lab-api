import { Injectable } from '@nestjs/common';
import { CreateInterviewSessionDto } from './dto/create-interview_session.dto';
import { UpdateInterviewSessionDto } from './dto/update-interview_session.dto';

@Injectable()
export class InterviewSessionsService {
    create(createInterviewSessionDto: CreateInterviewSessionDto) {
        return createInterviewSessionDto;
    }

    findAll() {
        return `This action returns all interviewSessions`;
    }

    findOne(id: number) {
        return `This action returns a #${id} interviewSession`;
    }

    update(id: number, updateInterviewSessionDto: UpdateInterviewSessionDto) {
        return updateInterviewSessionDto;
    }

    remove(id: number) {
        return `This action removes a #${id} interviewSession`;
    }
}
