import { Body, Controller, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { PaginatedResponse, PaginationQuery } from 'src/types/pagination';
import { CreateInterviewCategoryDto } from './dto/create-interview_category.dto';
import { InterviewCategoryResponse } from './dto/interview-category.dto';
import { UpdateInterviewCategoryDto } from './dto/update-interview_category.dto';
import { InterviewCategoriesService } from './interview_categories.service';

@Controller('/api/v1/interview-categories')
export class InterviewCategoriesController {
    constructor(private readonly interviewCategoriesService: InterviewCategoriesService) {}

    @Post()
    async create(@Body() req: CreateInterviewCategoryDto): Promise<InterviewCategoryResponse> {
        return await this.interviewCategoriesService.create(req);
    }

    @Get()
    async findAll(
        @Req() req: Request,
        @Query() query: PaginationQuery,
    ): Promise<PaginatedResponse<InterviewCategoryResponse>> {
        const raw = req.query as Record<string, string>;
        const filter: Record<string, string> = {};
        Object.keys(raw).forEach((k) => {
            if (k.startsWith('filter.')) {
                filter[k.split('.')[1]] = raw[k];
            }
        });

        return this.interviewCategoriesService.findAll({ ...query, filter }, req);
    }

    @Get('/:id')
    async findById(@Param('id') id: number): Promise<InterviewCategoryResponse> {
        return await this.interviewCategoriesService.findById(id);
    }

    @Patch('/:id')
    async update(
        @Param('id') id: number,
        @Body() req: UpdateInterviewCategoryDto,
    ): Promise<InterviewCategoryResponse | null> {
        return await this.interviewCategoriesService.update(id, req);
    }
}
