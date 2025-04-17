import { RoleEntity } from '../entities/role.entity';

export interface IRoleRepository {
    saveData: (role: RoleEntity) => Promise<RoleEntity>;
    findByName(name: string): Promise<RoleEntity | null>;
    findAllWithPaginate(options: {
        page: number;
        limit: number;
        sortBy: string[];
        search: string;
        filter?: { [key: string]: string };
    }): Promise<[RoleEntity[], number]>;

    findById(id: number): Promise<RoleEntity | null>;
}
