import { DifficultyLevelEntity } from 'src/app/difficulty_levels/entities/difficulty_level.entity';
import { InterviewCategoryEntity } from 'src/app/interview_categories/entities/interview_category.entity';
import { JobFieldEntity } from 'src/app/job_fields/entities/job_field.entity';
import { LanguageEntity } from 'src/app/languages/entities/language.entity';
import { UserEntity } from 'src/app/users/entities/user.entity';
import { MethodInterviewEnum } from 'src/enums/method-interview.enum';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('interview_sessions')
export class InterviewSessionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'integer',
        nullable: false,
    })
    userId: number;

    @Column({
        type: 'integer',
        nullable: false,
    })
    languageId: number;

    @Column({
        type: 'integer',
        nullable: false,
    })
    jobFieldId: number;

    @Column({
        type: 'integer',
        nullable: false,
    })
    interviewCategoryId: number;

    @Column({
        type: 'integer',
        nullable: false,
    })
    difficultyLevelId: number;

    @Column({
        type: 'enum',
        enum: MethodInterviewEnum,
        default: MethodInterviewEnum.TEXT,
    })
    method: MethodInterviewEnum;

    @Column({
        type: 'integer',
        nullable: false,
        default: 1,
    })
    questionCount: number;

    @Column({
        type: 'float',
        nullable: true,
    })
    score: number;

    @Column({
        type: 'datetime',
        nullable: true,
    })
    startedAt: Date;

    @Column({
        type: 'datetime',
        nullable: true,
    })
    finishedAt: Date;

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

    @ManyToOne(() => UserEntity, (user) => user.interviewSessions)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @ManyToOne(() => LanguageEntity, (language) => language.interviewSessions)
    @JoinColumn({ name: 'languageId' })
    language: LanguageEntity;

    @ManyToOne(() => JobFieldEntity, (jobField) => jobField.interviewSessions)
    @JoinColumn({ name: 'jobFieldId' })
    jobField: JobFieldEntity;

    @ManyToOne(() => InterviewCategoryEntity, (interviewCategory) => interviewCategory.interviewSessions)
    @JoinColumn({ name: 'interviewCategoryId' })
    interviewCategory: InterviewCategoryEntity;

    @ManyToOne(() => DifficultyLevelEntity, (difficultyLevel) => difficultyLevel.interviewSessions)
    @JoinColumn({ name: 'difficultyLevelId' })
    difficultyLevel: DifficultyLevelEntity;

    constructor(partial: Partial<InterviewSessionEntity>) {
        Object.assign(this, partial);
    }
}
