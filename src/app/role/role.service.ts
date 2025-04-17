import { ConflictException, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { Service } from 'src/decorators/service.decorator';
import { PaginatedResponse, PaginationQuery } from 'src/types/pagination';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleResponse } from './dto/role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
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

    async findAllRoleService(query: PaginationQuery, req: Request): Promise<PaginatedResponse<RoleResponse>> {
        const page = Number(query?.page) || 1;
        const limit = Number(query?.limit) || 10;
        const sortBy = query?.sortBy?.split(',') || [];
        const search = query?.search || '';
        const filter = query?.filter || {};

        const options = { page, limit, sortBy, search, filter };
        const [data, total] = await this.roleRepository.findAllWithPaginate(options);

        const totalPages = Math.ceil(total / limit);
        const baseUrl = `${req.protocol}://${req.get('host')}${req.path}`;

        const buildLink = (p: number) => {
            const sortByQuery = sortBy.length ? `&sortBy=${sortBy.join(',')}` : '';
            const searchQuery = search ? `&search=${search}` : '';
            const filterQuery = Object.entries(filter)
                .map(([key, value]) => `&filter.${key}=${value}`)
                .join('');

            return `${baseUrl}?limit=${limit}&page=${p}${sortByQuery}${searchQuery}${filterQuery}`;
        };

        return {
            items: data,
            meta: {
                itemsPerPage: limit,
                totalItems: total,
                currentPage: page,
                totalPages,
                sortBy: sortBy.map((s) => s.split(':') as [string, 'ASC' | 'DESC']),
                search,
                filter,
            },
            links: {
                first: buildLink(1),
                previous: buildLink(Math.max(1, page - 1)),
                current: buildLink(page),
                next: buildLink(Math.min(totalPages, page + 1)),
                last: buildLink(totalPages),
            },
        };
    }

    async findRoleByIdService(id: number): Promise<RoleResponse> {
        const role = await this.roleRepository.findById(id);
        if (!role) {
            throw new NotFoundException('Role not found');
        }

        return role;
    }

    async updateRoleService(id: number, req: UpdateRoleDto): Promise<RoleResponse | null> {
        const { name } = req;
        const role = await this.roleRepository.findById(id);
        if (!role) {
            throw new NotFoundException('Role not found');
        }

        const existingRole = await this.roleRepository.findByName(name);
        if (existingRole && existingRole.id !== id) {
            throw new ConflictException('Role already exists');
        }

        role.name = name;
        return await this.roleRepository.updateData(id, role);
    }

    async deleteRoleService(id: number): Promise<void> {
        const role = await this.roleRepository.findById(id);
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        return await this.roleRepository.deleteData(id);
    }
}
