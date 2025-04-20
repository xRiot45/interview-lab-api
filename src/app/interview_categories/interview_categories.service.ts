import { ConflictException, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { Service } from 'src/decorators/service.decorator';
import { PaginatedResponse, PaginationQuery } from 'src/types/pagination';
import { CreateInterviewCategoryDto } from './dto/create-interview_category.dto';
import { InterviewCategoryResponse } from './dto/interview-category.dto';
import { UpdateInterviewCategoryDto } from './dto/update-interview_category.dto';
import { InterviewCategoryEntity } from './entities/interview_category.entity';
import { InterviewCategoriesRepository } from './repositories/interview_categories.repository';

@Service()
export class InterviewCategoriesService {
    constructor(private readonly interviewCategoriesRepository: InterviewCategoriesRepository) {}

    async createV1(req: CreateInterviewCategoryDto) {
        const { name, isPublished } = req;
        const existingInterviewCategory = await this.interviewCategoriesRepository.findByName(name);
        if (existingInterviewCategory) {
            throw new ConflictException('Interview Category already exists');
        }

        const interviewCategoryEntity = new InterviewCategoryEntity({ name, isPublished });
        return await this.interviewCategoriesRepository.saveData(interviewCategoryEntity);
    }

    async findAllV1(query: PaginationQuery, req: Request): Promise<PaginatedResponse<InterviewCategoryResponse>> {
        const page = Number(query?.page) || 1;
        const limit = Number(query?.limit) || 10;
        const sortBy = query?.sortBy?.split(',') || [];
        const search = query?.search || '';
        const filter = query?.filter || {};

        const options = { page, limit, sortBy, search, filter };
        const [data, total] = await this.interviewCategoriesRepository.findAllWithPaginate(options);

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
            items: data,
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

    async findByIdV1(id: number): Promise<InterviewCategoryResponse> {
        const interviewCategory = await this.interviewCategoriesRepository.findById(id);
        if (!interviewCategory) {
            throw new NotFoundException('Interview Category not found');
        }

        return interviewCategory;
    }

    async updateV1(id: number, req: UpdateInterviewCategoryDto): Promise<InterviewCategoryResponse | null> {
        const { name, isPublished } = req;
        const interviewCategory = await this.interviewCategoriesRepository.findById(id);
        if (!interviewCategory) {
            throw new NotFoundException('Interview Category not found');
        }

        const existingInterviewCategory = await this.interviewCategoriesRepository.findByName(name ?? '');
        if (existingInterviewCategory && existingInterviewCategory.id !== id) {
            throw new ConflictException('Interview Category already exists');
        }

        interviewCategory.name = name ?? interviewCategory.name;
        interviewCategory.isPublished = isPublished ?? interviewCategory.isPublished;
        return await this.interviewCategoriesRepository.updateData(id, interviewCategory);
    }

    async deleteV1(id: number): Promise<void> {
        const interviewCategory = await this.interviewCategoriesRepository.findById(id);
        if (!interviewCategory) {
            throw new NotFoundException('Interview Category not found');
        }

        return await this.interviewCategoriesRepository.deleteData(id);
    }
}
