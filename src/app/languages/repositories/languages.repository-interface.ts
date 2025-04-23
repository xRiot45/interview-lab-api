import { LanguageEntity } from '../entities/language.entity';

export interface ILanguagesRepository {
    saveData(job_field: LanguageEntity): Promise<LanguageEntity>;
    findByName(name: string): Promise<LanguageEntity | null>;
    findAllWithPaginate(options: {
        page: number;
        limit: number;
        sortBy: string[];
        search: string;
        filter?: { [key: string]: string };
    }): Promise<[LanguageEntity[], number]>;
    findById(id: number): Promise<LanguageEntity | null>;
    updateData(id: number, job_field: LanguageEntity): Promise<LanguageEntity | null>;
    deleteData(id: number): Promise<void>;
}
