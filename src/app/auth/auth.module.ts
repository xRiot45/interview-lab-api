import { Module } from '@nestjs/common';
import { RoleModule } from '../role/role.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [UsersModule, RoleModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
