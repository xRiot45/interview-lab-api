import { DeleteResult } from 'typeorm';
import { JobFieldEntity } from '../entities/job_field.entity';

export interface IJobFieldsRepository {
    saveData(job_field: JobFieldEntity): Promise<JobFieldEntity>;
    findByName(name: string): Promise<JobFieldEntity | null>;
    findAllWithPaginate(options: {
        page: number;
        limit: number;
        sortBy: string[];
        search: string;
        filter?: { [key: string]: string };
    }): Promise<[JobFieldEntity[], number]>;
    findById(id: number): Promise<JobFieldEntity | null>;
    updateData(id: number, job_field: JobFieldEntity): Promise<JobFieldEntity | null>;
    deleteData(id: number): Promise<DeleteResult>;
}
