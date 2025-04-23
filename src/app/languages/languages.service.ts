import { ConflictException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { PaginatedResponse, PaginationQuery } from 'src/types/pagination';
import { CreateLanguageDto } from './dto/create-language.dto';
import { LanguageResponse } from './dto/language.dto';
import { LanguageEntity } from './entities/language.entity';
import { LanguageRepository } from './repositories/languages.repository';

@Injectable()
export class LanguagesService {
    constructor(private readonly languagesRepository: LanguageRepository) {}

    async createV1(req: CreateLanguageDto): Promise<LanguageResponse> {
        const { name, isPublished } = req;
        const existingLanguage = await this.languagesRepository.findByName(name);
        if (existingLanguage) {
            throw new ConflictException(`Language named "${name}" already exists`);
        }

        const language = new LanguageEntity({ name, isPublished });
        const saved = await this.languagesRepository.saveData(language);

        return plainToInstance(LanguageResponse, saved, { excludeExtraneousValues: true });
    }

    async findAllV1(query: PaginationQuery, req: Request): Promise<PaginatedResponse<LanguageResponse>> {
        const page = Number(query?.page) || 1;
        const limit = Number(query?.limit) || 10;
        const sortBy = query?.sortBy?.split(',') || [];
        const search = query?.search || '';
        const filter = query?.filter || {};

        const options = { page, limit, sortBy, search, filter };
        const [data, total] = await this.languagesRepository.findAllWithPaginate(options);

        const transformedItems = plainToInstance(LanguageResponse, data, {
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
}
