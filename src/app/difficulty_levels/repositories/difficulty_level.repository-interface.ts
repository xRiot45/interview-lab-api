import { DifficultyLevelEntity } from '../entities/difficulty_level.entity';

export interface IDifficultyLevelsRepository {
    saveData(interviewCategory: DifficultyLevelEntity): Promise<DifficultyLevelEntity>;
    findByName(name: string): Promise<DifficultyLevelEntity | null>;
    findAllWithPaginate(options: {
        page: number;
        limit: number;
        sortBy: string[];
        search: string;
        filter?: { [key: string]: string };
    }): Promise<[DifficultyLevelEntity[], number]>;

    findById(id: number): Promise<DifficultyLevelEntity | null>;
    updateData(id: number, interviewCategory: DifficultyLevelEntity): Promise<DifficultyLevelEntity | null>;
    deleteData(id: number): Promise<void>;
}
