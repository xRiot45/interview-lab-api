import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('/api/v1/role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Get()
    getHelloController() {
        return this.roleService.getHello();
    }
}
