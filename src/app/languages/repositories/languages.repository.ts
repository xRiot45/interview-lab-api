import { Inject } from '@nestjs/common';
import { Repository } from 'src/decorators/repository.decorator';
import { BaseRepository } from 'src/repositories/base.repository';
import { DataSource } from 'typeorm';
import { LanguageEntity } from '../entities/language.entity';
import { ILanguagesRepository } from './languages.repository-interface';

@Repository(LanguageEntity)
export class LanguageRepository extends BaseRepository<LanguageEntity> implements ILanguagesRepository {
    constructor(@Inject(DataSource) dataSource: DataSource) {
        super(LanguageEntity, dataSource);
    }

    public async saveData(job_field: LanguageEntity): Promise<LanguageEntity> {
        return await this.save(job_field);
    }

    public async findByName(name: string): Promise<LanguageEntity | null> {
        return await this.findOneBy({ name });
    }

    public async findAllWithPaginate(options: {
        page: number;
        limit: number;
        sortBy: string[];
        search: string;
        filter?: { [key: string]: string | number | boolean };
    }): Promise<[LanguageEntity[], number]> {
        const { page, limit, sortBy, search, filter } = options;
        const queryBuilder = this.createQueryBuilder('language');

        if (search) {
            queryBuilder.andWhere('language.name LIKE :search', {
                search: `%${search}%`,
            });
        }

        if (filter && Object.keys(filter).length > 0) {
            Object.keys(filter).forEach((key) => {
                queryBuilder.andWhere(`language.${key} = :${key}`, { [key]: filter[key] });
            });
        }

        if (sortBy) {
            sortBy.forEach((sort) => {
                const [field, order = 'ASC'] = sort.split(':');
                if (field && order) {
                    queryBuilder.addOrderBy(`language.${field}`, order.toUpperCase() as 'ASC' | 'DESC');
                }
            });
        }

        queryBuilder.skip((page - 1) * limit).take(limit);
        return await queryBuilder.getManyAndCount();
    }

    public async findById(id: number): Promise<LanguageEntity | null> {
        return await this.findOneBy({ id });
    }

    public async updateData(id: number, job_field: LanguageEntity): Promise<LanguageEntity | null> {
        await this.update(id, job_field);
        return await this.findOneBy({ id });
    }

    async deleteData(id: number): Promise<void> {
        await this.delete(id);
    }
}
