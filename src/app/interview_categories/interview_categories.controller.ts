import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Version } from '@nestjs/common';
import { Request } from 'express';
import { PaginatedResponse, PaginationQuery } from 'src/types/pagination';
import { CreateInterviewCategoryDto } from './dto/create-interview_category.dto';
import { InterviewCategoryResponse } from './dto/interview-category.dto';
import { UpdateInterviewCategoryDto } from './dto/update-interview_category.dto';
import { InterviewCategoriesService } from './interview_categories.service';

@Controller('interview-categories')
export class InterviewCategoriesController {
    constructor(private readonly interviewCategoriesService: InterviewCategoriesService) {}

    @Post()
    @Version('1')
    async create(@Body() req: CreateInterviewCategoryDto): Promise<InterviewCategoryResponse> {
        return await this.interviewCategoriesService.createV1(req);
    }

    @Get()
    @Version('1')
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

        return this.interviewCategoriesService.findAllV1({ ...query, filter }, req);
    }

    @Get('/:id')
    @Version('1')
    async findById(@Param('id') id: number): Promise<InterviewCategoryResponse> {
        return await this.interviewCategoriesService.findByIdV1(id);
    }

    @Patch('/:id')
    @Version('1')
    async update(
        @Param('id') id: number,
        @Body() req: UpdateInterviewCategoryDto,
    ): Promise<InterviewCategoryResponse | null> {
        return await this.interviewCategoriesService.updateV1(id, req);
    }

    @Delete('/:id')
    @Version('1')
    async delete(@Param('id') id: number): Promise<void> {
        return await this.interviewCategoriesService.deleteV1(id);
    }
}
