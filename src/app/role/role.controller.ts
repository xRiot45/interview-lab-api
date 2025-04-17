import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { PaginationQuery } from 'src/types/pagination';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleResponse } from './dto/role.dto';
import { RoleService } from './role.service';

@Controller('/api/v1/role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post()
    async createRoleController(@Body() req: CreateRoleDto): Promise<RoleResponse> {
        return this.roleService.createRoleService(req);
    }

    @Get()
    async findAllRoleController(@Req() req: Request, @Query() query: PaginationQuery) {
        const raw = req.query as Record<string, string>;
        const filter: Record<string, string> = {};
        Object.keys(raw).forEach((k) => {
            if (k.startsWith('filter.')) {
                filter[k.split('.')[1]] = raw[k];
            }
        });

        return this.roleService.findAllRoleService({ ...query, filter }, req);
    }

    @Get('/:id')
    async findRoleByIdController(@Param('id') id: number) {
        return this.roleService.findRoleByIdService(id);
    }
}
