import { ConflictException, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { Service } from 'src/decorators/service.decorator';
import { PaginatedResponse, PaginationQuery } from 'src/types/pagination';
import { CreateDifficultyLevelDto } from './dto/create-difficulty_level.dto';
import { DifficultyLevelResponse } from './dto/difficulty_level.dto';
import { UpdateDifficultyLevelDto } from './dto/update-difficulty_level.dto';
import { DifficultyLevelEntity } from './entities/difficulty_level.entity';
import { DifficultyLevelRepository } from './repositories/difficulty_level.repository';

@Service()
export class DifficultyLevelsService {
    constructor(private readonly difficultyLevelRepository: DifficultyLevelRepository) {}

    async createV1(req: CreateDifficultyLevelDto) {
        const { name, isPublished } = req;
        const existingDifficultyLevel = await this.difficultyLevelRepository.findByName(name);
        if (existingDifficultyLevel) {
            throw new ConflictException('Difficulty Level already exists');
        }

        const difficultyLevelEntity = new DifficultyLevelEntity({ name, isPublished });
        return await this.difficultyLevelRepository.saveData(difficultyLevelEntity);
    }

    async findAllV1(query: PaginationQuery, req: Request): Promise<PaginatedResponse<DifficultyLevelResponse>> {
        const page = Number(query?.page) || 1;
        const limit = Number(query?.limit) || 10;
        const sortBy = query?.sortBy?.split(',') || [];
        const search = query?.search || '';
        const filter = query?.filter || {};

        const options = { page, limit, sortBy, search, filter };
        const [data, total] = await this.difficultyLevelRepository.findAllWithPaginate(options);

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

    async findByIdV1(id: number): Promise<DifficultyLevelResponse> {
        const difficultiLevel = await this.difficultyLevelRepository.findById(id);
        if (!difficultiLevel) {
            throw new NotFoundException('Difficulty not found');
        }

        return difficultiLevel;
    }

    async updateV1(id: number, req: UpdateDifficultyLevelDto): Promise<DifficultyLevelResponse | null> {
        const { name, isPublished } = req;
        const difficultyLevel = await this.difficultyLevelRepository.findById(id);
        if (!difficultyLevel) {
            throw new NotFoundException('Difficulty not found');
        }

        const existingDifficultyLevel = await this.difficultyLevelRepository.findByName(name ?? '');
        if (existingDifficultyLevel && existingDifficultyLevel.id !== id) {
            throw new ConflictException('Difficulty Level already exists');
        }

        difficultyLevel.name = name ?? difficultyLevel.name;
        difficultyLevel.isPublished = isPublished ?? difficultyLevel.isPublished;
        return await this.difficultyLevelRepository.updateData(id, difficultyLevel);
    }

    async deleteV1(id: number): Promise<void> {
        const difficultyLevel = await this.difficultyLevelRepository.findById(id);
        if (!difficultyLevel) {
            throw new NotFoundException('Difficulty Level not found');
        }

        return await this.difficultyLevelRepository.deleteData(id);
    }
}
