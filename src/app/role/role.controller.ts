import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Version } from '@nestjs/common';
import { Request } from 'express';
import { PaginationQuery } from 'src/types/pagination';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleResponse } from './dto/role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post()
    @Version('1')
    async createV1(@Body() req: CreateRoleDto): Promise<RoleResponse> {
        return this.roleService.createV1(req);
    }

    @Get()
    @Version('1')
    async findAllV1(@Req() req: Request, @Query() query: PaginationQuery) {
        const raw = req.query as Record<string, string>;
        const filter: Record<string, string> = {};
        Object.keys(raw).forEach((k) => {
            if (k.startsWith('filter.')) {
                filter[k.split('.')[1]] = raw[k];
            }
        });

        return this.roleService.findAllV1({ ...query, filter }, req);
    }

    @Get('/:id')
    @Version('1')
    async findByIdV1(@Param('id') id: number) {
        return this.roleService.findByIdV1(id);
    }

    @Put('/:id')
    @Version('1')
    async updateV1(@Param('id') id: number, @Body() req: UpdateRoleDto) {
        return this.roleService.updateV1(id, req);
    }

    @Delete('/:id')
    @Version('1')
    async deleteV1(@Param('id') id: number) {
        return this.roleService.deleteV1(id);
    }
}
