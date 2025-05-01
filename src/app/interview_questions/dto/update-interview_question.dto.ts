import { PartialType } from '@nestjs/mapped-types';
import { CreateInterviewQuestionDto } from './create-interview_question.dto';

export class UpdateInterviewQuestionDto extends PartialType(CreateInterviewQuestionDto) {}
