import { MethodInterviewEnum } from 'src/enums/method-interview.enum';

export class InterviewSessionResponse {
    languageId: number;
    jobFieldId: number;
    interviewCategoryId: number;
    difficultyLevelId: number;
    method: MethodInterviewEnum;
    questionCount: number;
}
