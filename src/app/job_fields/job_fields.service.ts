import { ConflictException, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { Service } from 'src/decorators/service.decorator';
import { PaginatedResponse, PaginationQuery } from 'src/types/pagination';
import { CreateJobFieldDto } from './dto/create-job_field.dto';
import { JobFieldResponse } from './dto/job_field.dto';
import { JobFieldEntity } from './entities/job_field.entity';
import { JobFieldsRepository } from './repositories/job_fields.repository';

@Service()
export class JobFieldsService {
    constructor(private readonly jobFieldsRepository: JobFieldsRepository) {}

    async createV1(req: CreateJobFieldDto): Promise<JobFieldResponse> {
        const { name, isPublished } = req;
        const existingJobField = await this.jobFieldsRepository.findByName(name);
        if (existingJobField) {
            throw new ConflictException(`Job field named "${name}" already exists`);
        }

        const jobField = new JobFieldEntity({ name, isPublished });
        const saved = await this.jobFieldsRepository.saveData(jobField);

        return plainToInstance(JobFieldResponse, saved, { excludeExtraneousValues: true });
    }

    async findAllV1(query: PaginationQuery, req: Request): Promise<PaginatedResponse<JobFieldResponse>> {
        const page = Number(query?.page) || 1;
        const limit = Number(query?.limit) || 10;
        const sortBy = query?.sortBy?.split(',') || [];
        const search = query?.search || '';
        const filter = query?.filter || {};

        const options = { page, limit, sortBy, search, filter };
        const [data, total] = await this.jobFieldsRepository.findAllWithPaginate(options);

        const transformedItems = plainToInstance(JobFieldResponse, data, {
            excludeExtraneousValues: true,
        });

        const totalPages = Math.ceil(total / limit);
        const baseUrl = `${req.protocol}://${req.get('host')}${req.path}`;

        const buildLink = (p: number) => {
            const sortByQuery = sortBy.length ? `&sortBy=${sortBy.join(',')}` : '';
            const searchQuery = search ? `&search=${search}` : '';
            const filterQuery = Object.entries(filter)
                .map(([key, value]) => `&filter.${key}=${value}`)
                .join('');

            return `${baseUrl}?limit=${limit}&page=${p}${sortByQuery}${searchQuery}${filterQuery}`;
        };

        return {
            items: transformedItems,
            meta: {
                itemsPerPage: limit,
                totalItems: total,
                currentPage: page,
                totalPages,
                sortBy: sortBy.map((s) => s.split(':') as [string, 'ASC' | 'DESC']),
                search,
                filter,
            },
            links: {
                first: buildLink(1),
                previous: buildLink(Math.max(1, page - 1)),
                current: buildLink(page),
                next: buildLink(Math.min(totalPages, page + 1)),
                last: buildLink(totalPages),
            },
        };
    }

    async findByIdV1(id: number): Promise<JobFieldResponse> {
        const jobField = await this.jobFieldsRepository.findById(id);
        if (!jobField) {
            throw new NotFoundException('Job Field not found');
        }

        return plainToInstance(JobFieldResponse, jobField, { excludeExtraneousValues: true });
    }

    async updateV1(id: number, req: CreateJobFieldDto): Promise<JobFieldResponse> {
        const { name, isPublished } = req;
        const jobField = await this.jobFieldsRepository.findById(id);
        if (!jobField) {
            throw new NotFoundException('Job Field not found');
        }

        const existingJobField = await this.jobFieldsRepository.findByName(name);
        if (existingJobField && existingJobField.id !== id) {
            throw new ConflictException(`Job field named "${name}" already exists`);
        }

        jobField.name = name;
        jobField.isPublished = isPublished;

        const updatedData = await this.jobFieldsRepository.updateData(id, jobField);
        return plainToInstance(JobFieldResponse, updatedData, { excludeExtraneousValues: true });
    }

    async deleteV1(id: number): Promise<void> {
        const jobField = await this.jobFieldsRepository.findById(id);
        if (!jobField) {
            throw new NotFoundException('Job Field not found');
        }

        return await this.jobFieldsRepository.deleteData(id);
    }
}
