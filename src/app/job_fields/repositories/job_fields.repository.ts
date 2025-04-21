import { Inject } from '@nestjs/common';
import { Repository } from 'src/decorators/repository.decorator';
import { BaseRepository } from 'src/repositories/base.repository';
import { DataSource, DeleteResult } from 'typeorm';
import { JobFieldEntity } from '../entities/job_field.entity';
import { IJobFieldsRepository } from './job_fields.repository-interface';

@Repository(JobFieldEntity)
export class JobFieldsRepository extends BaseRepository<JobFieldEntity> implements IJobFieldsRepository {
    constructor(@Inject(DataSource) dataSource: DataSource) {
        super(JobFieldEntity, dataSource);
    }

    public async saveData(job_field: JobFieldEntity): Promise<JobFieldEntity> {
        return await this.save(job_field);
    }

    public async findByName(name: string): Promise<JobFieldEntity | null> {
        return await this.findOneBy({ name });
    }

    public async findAllWithPaginate(options: {
        page: number;
        limit: number;
        sortBy: string[];
        search: string;
        filter?: { [key: string]: string | number | boolean };
    }): Promise<[JobFieldEntity[], number]> {
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

        queryBuilder.skip((page - 1) * limit).take(limit);
        return await queryBuilder.getManyAndCount();
    }

    public async findById(id: number): Promise<JobFieldEntity | null> {
        return await this.findOneBy({ id });
    }

    public async updateData(id: number, job_field: JobFieldEntity): Promise<JobFieldEntity | null> {
        await this.update(id, job_field);
        return await this.findOneBy({ id });
    }

    async deleteData(id: number): Promise<DeleteResult> {
        return await this.delete(id);
    }
}
