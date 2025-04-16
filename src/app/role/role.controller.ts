import { Body, Controller, Post } from '@nestjs/common';
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
}
