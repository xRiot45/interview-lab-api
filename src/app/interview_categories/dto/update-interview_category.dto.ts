import { PartialType } from '@nestjs/mapped-types';
import { CreateInterviewCategoryDto } from './create-interview_category.dto';

export class UpdateInterviewCategoryDto extends PartialType(CreateInterviewCategoryDto) {}
