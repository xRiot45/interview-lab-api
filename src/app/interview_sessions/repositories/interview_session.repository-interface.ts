import { InterviewSessionEntity } from '../entities/interview_session.entity';

export interface IInterviewSessionRepository {
    saveData(interviewSession: InterviewSessionEntity): Promise<InterviewSessionEntity | null>;
}
