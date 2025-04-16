import { Inject } from '@nestjs/common';
import { Repository } from 'src/decorators/repository.decorator';
import { DataSource, Repository as TypeOrmRepository } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { IRoleRepository } from './role.repositoy.interface';

@Repository(RoleEntity)
export class RoleRepository extends TypeOrmRepository<RoleEntity> implements IRoleRepository {
    constructor(@Inject(DataSource) dataSource: DataSource) {
        super(RoleEntity, dataSource.createEntityManager());
    }

    public async saveData(role: RoleEntity): Promise<RoleEntity> {
        return this.save(role);
    }

    public async findByName(name: string): Promise<RoleEntity | null> {
        return this.findOneBy({ name });
    }

    public async findAll(): Promise<RoleEntity[]> {
        return this.find();
    }

    public async findById(id: number): Promise<RoleEntity | null> {
        return this.findOneBy({ id });
    }
}
