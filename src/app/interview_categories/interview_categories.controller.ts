import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { PaginationQuery } from 'src/types/pagination';
import { CreateInterviewCategoryDto } from './dto/create-interview_category.dto';
import { InterviewCategoriesService } from './interview_categories.service';

@Controller('/api/v1/interview-categories')
export class InterviewCategoriesController {
    constructor(private readonly interviewCategoriesService: InterviewCategoriesService) {}

    @Post()
    async create(@Body() req: CreateInterviewCategoryDto) {
        return await this.interviewCategoriesService.create(req);
    }

    @Get()
    async findAll(@Req() req: Request, @Query() query: PaginationQuery) {
        const raw = req.query as Record<string, string>;
        const filter: Record<string, string> = {};
        Object.keys(raw).forEach((k) => {
            if (k.startsWith('filter.')) {
                filter[k.split('.')[1]] = raw[k];
            }
        });

        return this.interviewCategoriesService.findAll({ ...query, filter }, req);
    }
}
