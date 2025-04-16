import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { RoleRepository } from './repositories/role.repository';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
    imports: [TypeOrmModule.forFeature([RoleEntity])],
    providers: [RoleService, RoleRepository],
    exports: [RoleService, RoleRepository],
    controllers: [RoleController],
})
export class RoleModule {}
