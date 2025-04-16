import { RoleEntity } from '../entities/role.entity';

export interface IRoleRepository {
    saveData: (role: RoleEntity) => Promise<RoleEntity>;
    findByName(name: string): Promise<RoleEntity | null>;
    findAll(): Promise<RoleEntity[]>;
    findById(id: number): Promise<RoleEntity | null>;
}
