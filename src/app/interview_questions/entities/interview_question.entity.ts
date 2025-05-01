import { InterviewSessionEntity } from 'src/app/interview_sessions/entities/interview_session.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('interview_questions')
export class InterviewQuestionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'integer',
        nullable: false,
    })
    interviewSessionId: number;

    @Column({
        type: 'text',
        nullable: false,
    })
    question: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    userAnswer: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    aiAnswer: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    feedback: string;

    @Column({
        type: 'integer',
        nullable: false,
    })
    score: number;

    @Column({
        type: 'integer',
        nullable: false,
    })
    questionOrder: number;

    @ManyToOne(() => InterviewSessionEntity, (interviewSession) => interviewSession.interviewQuestions)
    interviewSession: InterviewSessionEntity;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;

    constructor(partial: Partial<InterviewQuestionEntity>) {
        Object.assign(this, partial);
    }
}
