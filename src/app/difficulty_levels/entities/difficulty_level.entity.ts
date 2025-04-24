import { InterviewSessionEntity } from 'src/app/interview_sessions/entities/interview_session.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('difficulty_levels')
export class DifficultyLevelEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name: string;

    @Column({
        type: Boolean,
        nullable: false,
        default: true,
    })
    isPublished: boolean;

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

    @OneToMany(() => InterviewSessionEntity, (interviewSession) => interviewSession.difficultyLevel)
    interviewSessions: InterviewSessionEntity[];

    constructor(partial: Partial<DifficultyLevelEntity>) {
        Object.assign(this, partial);
    }
}
