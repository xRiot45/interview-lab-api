import { ConflictException } from '@nestjs/common';
import { Service } from 'src/decorators/service.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleResponse } from './dto/role.dto';
import { RoleEntity } from './entities/role.entity';
import { RoleRepository } from './repositories/role.repository';

@Service()
export class RoleService {
    constructor(private readonly roleRepository: RoleRepository) {}

    async createRoleService(req: CreateRoleDto): Promise<RoleResponse> {
        const { name } = req;
        const existingRole = await this.roleRepository.findByName(name);
        if (existingRole) {
            throw new ConflictException('Role already exists');
        }

        const roleEntity = new RoleEntity({ name });
        return await this.roleRepository.saveData(roleEntity);
    }

    async findAllRoleService(): Promise<RoleResponse[]> {
        return await this.roleRepository.findAll();
    }
}
