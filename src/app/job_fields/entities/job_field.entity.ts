import { InterviewSessionEntity } from 'src/app/interview_sessions/entities/interview_session.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('job_fields')
export class JobFieldEntity {
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

    @OneToMany(() => InterviewSessionEntity, (interviewSession) => interviewSession.jobField)
    interviewSessions: InterviewSessionEntity[];

    constructor(partial: Partial<JobFieldEntity>) {
        Object.assign(this, partial);
    }
}
