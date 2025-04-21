import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Version } from '@nestjs/common';
import { Request } from 'express';
import { PaginatedResponse, PaginationQuery } from 'src/types/pagination';
import { CreateJobFieldDto } from './dto/create-job_field.dto';
import { JobFieldResponse } from './dto/job_field.dto';
import { JobFieldsService } from './job_fields.service';

@Controller('job-fields')
export class JobFieldsController {
    constructor(private readonly jobFieldsService: JobFieldsService) {}

    @Post()
    @Version('1')
    async createV1(@Body() req: CreateJobFieldDto): Promise<JobFieldResponse> {
        return this.jobFieldsService.createV1(req);
    }

    @Get()
    @Version('1')
    async findAllV1(
        @Req() req: Request,
        @Query() query: PaginationQuery,
    ): Promise<PaginatedResponse<JobFieldResponse>> {
        const raw = req.query as Record<string, string>;
        const filter: Record<string, string> = {};
        Object.keys(raw).forEach((k) => {
            if (k.startsWith('filter.')) {
                filter[k.split('.')[1]] = raw[k];
            }
        });

        return this.jobFieldsService.findAllV1({ ...query, filter }, req);
    }

    @Get('/:id')
    @Version('1')
    async findByIdV1(@Param('id') id: number): Promise<JobFieldResponse> {
        return this.jobFieldsService.findByIdV1(id);
    }

    @Patch('/:id')
    @Version('1')
    async updateV1(@Param('id') id: number, @Body() req: CreateJobFieldDto): Promise<JobFieldResponse> {
        return this.jobFieldsService.updateV1(id, req);
    }

    @Delete('/:id')
    @Version('1')
    async deleteV1(@Param('id') id: number): Promise<void> {
        return this.jobFieldsService.deleteV1(id);
    }
}
