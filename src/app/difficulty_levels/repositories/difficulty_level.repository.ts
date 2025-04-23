import { Inject } from '@nestjs/common';
import { Repository } from 'src/decorators/repository.decorator';
import { BaseRepository } from 'src/repositories/base.repository';
import { DataSource } from 'typeorm';
import { DifficultyLevelEntity } from '../entities/difficulty_level.entity';
import { IDifficultyLevelsRepository } from './difficulty_level.repository-interface';

@Repository(DifficultyLevelEntity)
export class DifficultyLevelRepository
    extends BaseRepository<DifficultyLevelEntity>
    implements IDifficultyLevelsRepository
{
    constructor(@Inject(DataSource) dataSource: DataSource) {
        super(DifficultyLevelEntity, dataSource);
    }

    public async findByName(name: string): Promise<DifficultyLevelEntity | null> {
        return await this.findOneBy({ name });
    }

    public async saveData(interviewCategory: DifficultyLevelEntity): Promise<DifficultyLevelEntity> {
        return await this.save(interviewCategory);
    }

    public async findAllWithPaginate(options: {
        page: number;
        limit: number;
        sortBy: string[];
        search: string;
        filter?: { [key: string]: string | number | boolean };
    }): Promise<[DifficultyLevelEntity[], number]> {
        const { page, limit, sortBy, search, filter } = options;
        const queryBuilder = this.createQueryBuilder('difficulty_level');

        if (search) {
            queryBuilder.andWhere('difficulty_level.name LIKE :search', {
                search: `%${search}%`,
            });
        }

        if (filter && Object.keys(filter).length > 0) {
            Object.keys(filter).forEach((key) => {
                queryBuilder.andWhere(`difficulty_level.${key} = :${key}`, { [key]: filter[key] });
            });
        }

        if (sortBy) {
            sortBy.forEach((sort) => {
                const [field, order = 'ASC'] = sort.split(':');
                if (field && order) {
                    queryBuilder.addOrderBy(`difficulty_level.${field}`, order.toUpperCase() as 'ASC' | 'DESC');
                }
            });
        }

        // Pagination
        queryBuilder.skip((page - 1) * limit).take(limit);
        return await queryBuilder.getManyAndCount();
    }

    public async findById(id: number): Promise<DifficultyLevelEntity | null> {
        return await this.findOneBy({ id });
    }

    public async updateData(
        id: number,
        interviewCategory: DifficultyLevelEntity,
    ): Promise<DifficultyLevelEntity | null> {
        await this.update(id, interviewCategory);
        return this.findOneBy({ id });
    }
    public async deleteData(id: number): Promise<void> {
        await this.delete(id);
    }
}
