import { Body, Controller, Get, Param, Post, Query, Req, Version } from '@nestjs/common';
import { Request } from 'express';
import { PaginatedResponse, PaginationQuery } from 'src/types/pagination';
import { CreateJobFieldDto } from './dto/create-job_field.dto';
import { JobFieldResponse } from './dto/job_field.dto';
import { JobFieldEntity } from './entities/job_field.entity';
import { JobFieldsService } from './job_fields.service';

@Controller('job-fields')
export class JobFieldsController {
    constructor(private readonly jobFieldsService: JobFieldsService) {}

    @Post()
    @Version('1')
    async createV1(@Body() req: CreateJobFieldDto): Promise<JobFieldEntity> {
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
    async findByIdV1(@Param('id') id: number): Promise<JobFieldEntity> {
        return this.jobFieldsService.findByIdV1(id);
    }
}
