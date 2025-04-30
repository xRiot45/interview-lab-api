import { InterviewSessionEntity } from '../entities/interview_session.entity';

export interface IInterviewSessionRepository {
    saveData(interviewSession: InterviewSessionEntity): Promise<InterviewSessionEntity | null>;
    findAll(userId: number): Promise<InterviewSessionEntity[]>;
    findById(userId: number, id: number): Promise<InterviewSessionEntity | null>;
}
