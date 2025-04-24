import { InterviewSessionEntity } from 'src/app/interview_sessions/entities/interview_session.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class LanguageEntity {
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

    @OneToMany(() => InterviewSessionEntity, (interviewSession) => interviewSession.language)
    interviewSessions: InterviewSessionEntity[];

    constructor(partial: Partial<LanguageEntity>) {
        Object.assign(this, partial);
    }
}
