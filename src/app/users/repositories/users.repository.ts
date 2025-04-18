import { Inject } from '@nestjs/common';
import { Repository } from 'src/decorators/repository.decorator';
import { DataSource, Repository as TypeOrmRepository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { IUsersRepository } from './users.repository-interface';

@Repository(UserEntity)
export class UsersRepository extends TypeOrmRepository<UserEntity> implements IUsersRepository {
    constructor(@Inject(DataSource) dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager());
    }

    public async saveData(user: UserEntity): Promise<UserEntity> {
        return this.save(user);
    }

    public async findByEmail(email: string): Promise<UserEntity | null> {
        return this.findOne({
            where: { email },
            relations: ['role'],
        });
    }

    public async findById(id: number): Promise<UserEntity | null> {
        return this.findOne({
            where: { id },
            relations: ['role'],
        });
    }
}
