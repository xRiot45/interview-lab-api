import { classToPlain } from '@nestjs/class-transformer';
import { ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Service } from 'src/decorators/service.decorator';
import { RoleRepository } from '../role/repositories/role.repository';
import { UserEntity } from '../users/entities/user.entity';
import { UsersRepository } from '../users/repositories/users.repository';
import { RegisterDto, RegisterResponse } from './dto/auth.dto';

@Service()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly roleRepository: RoleRepository,
    ) {}

    async register(req: RegisterDto): Promise<RegisterResponse> {
        const { fullName, email, password } = req;
        const emailExisting = await this.usersRepository.findByEmail(email);
        if (emailExisting) {
            throw new ConflictException('Email already exists');
        }

        const role = await this.roleRepository.findByName('user');
        if (!role) {
            throw new NotFoundException('Role not found');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const payload = new UserEntity({
            fullName,
            email,
            password: hashedPassword,
            role: role,
        });

        const user = classToPlain(await this.usersRepository.saveData(payload));
        return user as RegisterResponse;
    }
}
