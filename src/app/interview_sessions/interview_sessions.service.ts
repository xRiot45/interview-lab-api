import { Injectable } from '@nestjs/common';
import { CreateInterviewSessionDto } from './dto/create-interview_session.dto';

@Injectable()
export class InterviewSessionsService {
    create(createInterviewSessionDto: CreateInterviewSessionDto) {
        return createInterviewSessionDto;
    }
}
