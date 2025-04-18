import { Exclude, Expose } from '@nestjs/class-transformer';
import { RoleEntity } from 'src/app/role/entities/role.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    @Expose()
    fullName: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        unique: true,
    })
    @Expose()
    email: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    @Exclude()
    password: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    @Expose()
    avatar?: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    googleId?: string;

    @ManyToOne(() => RoleEntity, (role) => role.users)
    @Expose()
    role: RoleEntity;

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

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
