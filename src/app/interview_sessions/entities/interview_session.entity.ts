import { DifficultyLevelEntity } from 'src/app/difficulty_levels/entities/difficulty_level.entity';
import { InterviewCategoryEntity } from 'src/app/interview_categories/entities/interview_category.entity';
import { JobFieldEntity } from 'src/app/job_fields/entities/job_field.entity';
import { LanguageEntity } from 'src/app/languages/entities/language.entity';
import { UserEntity } from 'src/app/users/entities/user.entity';
import { MethodInterviewEnum } from 'src/enums/method-interview.enum';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class InterviewSessionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.interviewSessions)
    user: UserEntity;

    @ManyToOne(() => LanguageEntity, (language) => language.interviewSessions)
    language: LanguageEntity;

    @ManyToOne(() => JobFieldEntity, (jobField) => jobField.interviewSessions)
    jobField: JobFieldEntity;

    @ManyToOne(() => InterviewCategoryEntity, (interviewCategory) => interviewCategory.interviewSessions)
    interviewCategory: InterviewCategoryEntity;

    @ManyToOne(() => DifficultyLevelEntity, (difficultyLevel) => difficultyLevel.interviewSessions)
    difficultyLevel: DifficultyLevelEntity;

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
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
    })
    startedAt: Date;

    @Column({
        type: 'datetime',
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

    constructor(partial: Partial<InterviewSessionEntity>) {
        Object.assign(this, partial);
    }
}
