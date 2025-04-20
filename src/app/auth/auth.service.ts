import { classToPlain } from '@nestjs/class-transformer';
import { ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { Service } from 'src/decorators/service.decorator';
import { JwtPayload } from 'src/types/auth';
import { RoleRepository } from '../role/repositories/role.repository';
import { UserEntity } from '../users/entities/user.entity';
import { UsersRepository } from '../users/repositories/users.repository';
import { LoginDto, LoginResponse, RegisterDto, RegisterResponse } from './dto/auth.dto';

@Service()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly roleRepository: RoleRepository,
        private readonly jwtService: JwtService,
    ) {}

    async registerV1(req: RegisterDto): Promise<RegisterResponse> {
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

    async loginV1(req: LoginDto): Promise<LoginResponse> {
        const { email, password } = req;
        const user = await this.usersRepository.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const payload = { sub: user.id, email: user.email, role: user.role };
        const accessToken = this.jwtService.sign(
            { ...payload, tokenType: 'access' },
            {
                secret: process.env.ACCESS_TOKEN_SECRET,
            },
        );

        const refreshToken = this.jwtService.sign(
            { ...payload, tokenType: 'refresh' },
            {
                secret: process.env.REFRESH_TOKEN_SECRET,
                expiresIn: 7 * 24 * 60 * 60, // 7 days
            },
        );

        return { accessToken, refreshToken };
    }

    async validateUserV1(email: string, password: string) {
        const user = await this.usersRepository.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid email or password');
        }

        return { id: user.id, email: user.email, role: user.role };
    }

    async getProfileV1(user: { userId: number }) {
        const foundUser = await this.usersRepository.findById(user.userId);
        if (!foundUser) {
            throw new NotFoundException('User not found');
        }

        const { ...result } = classToPlain(foundUser);
        return result;
    }

    async refreshTokenV1(refreshToken: string): Promise<{ accessToken: string }> {
        const decodedPayload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
            secret: process.env.REFRESH_TOKEN_SECRET,
        });

        if (decodedPayload.tokenType !== 'refresh') {
            throw new UnauthorizedException('Token is not a refresh token');
        }

        const { sub, email, role } = decodedPayload;
        const newAccessToken = await this.jwtService.signAsync(
            { sub, email, role },
            {
                secret: process.env.ACCESS_TOKEN_SECRET,
            },
        );

        return { accessToken: newAccessToken };
    }

    logoutV1(res: Response): void {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        return;
    }
}
