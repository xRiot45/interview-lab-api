import { Inject } from '@nestjs/common';
import { Repository } from 'src/decorators/repository.decorator';
import { BaseRepository } from 'src/repositories/base.repository';
import { DataSource } from 'typeorm';
import { InterviewCategoryEntity } from '../entities/interview_category.entity';
import { IInterviewCategoriesRepository } from './interview_categories.repository-interface';

@Repository(InterviewCategoryEntity)
export class InterviewCategoriesRepository
    extends BaseRepository<InterviewCategoryEntity>
    implements IInterviewCategoriesRepository
{
    constructor(@Inject(DataSource) dataSource: DataSource) {
        super(InterviewCategoryEntity, dataSource);
    }

    public async findByName(name: string): Promise<InterviewCategoryEntity | null> {
        return await this.findOneBy({ name });
    }

    public async saveData(interviewCategory: InterviewCategoryEntity): Promise<InterviewCategoryEntity> {
        return await this.save(interviewCategory);
    }

    public async findAllWithPaginate(options: {
        page: number;
        limit: number;
        sortBy: string[];
        search: string;
        filter?: { [key: string]: string | number | boolean };
    }): Promise<[InterviewCategoryEntity[], number]> {
        const { page, limit, sortBy, search, filter } = options;
        const queryBuilder = this.createQueryBuilder('interview_category');

        if (search) {
            queryBuilder.andWhere('interview_category.name LIKE :search', {
                search: `%${search}%`,
            });
        }

        if (filter && Object.keys(filter).length > 0) {
            Object.keys(filter).forEach((key) => {
                queryBuilder.andWhere(`interview_category.${key} = :${key}`, { [key]: filter[key] });
            });
        }

        if (sortBy) {
            sortBy.forEach((sort) => {
                const [field, order = 'ASC'] = sort.split(':');
                if (field && order) {
                    queryBuilder.addOrderBy(`interview_category.${field}`, order.toUpperCase() as 'ASC' | 'DESC');
                }
            });
        }

        // Pagination
        queryBuilder.skip((page - 1) * limit).take(limit);
        return await queryBuilder.getManyAndCount();
    }
}
