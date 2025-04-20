import { InterviewCategoryEntity } from '../entities/interview_category.entity';

export interface IInterviewCategoriesRepository {
    saveData(interviewCategory: InterviewCategoryEntity): Promise<InterviewCategoryEntity>;
    findByName(name: string): Promise<InterviewCategoryEntity | null>;
    findAllWithPaginate(options: {
        page: number;
        limit: number;
        sortBy: string[];
        search: string;
        filter?: { [key: string]: string | number | boolean };
    }): Promise<[InterviewCategoryEntity[], number]>;

    findById(id: number): Promise<InterviewCategoryEntity | null>;
    updateData(id: number, interviewCategory: InterviewCategoryEntity): Promise<InterviewCategoryEntity | null>;
    deleteData(id: number): Promise<void>;
}
