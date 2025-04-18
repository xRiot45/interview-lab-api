import { Type } from '@nestjs/class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { RoleResponse } from 'src/app/role/dto/role.dto';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    readonly fullName: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}

export class RegisterResponse {
    id: number;
    fullName: string;
    email: string;

    @Type(() => RoleResponse)
    role: RoleResponse;

    avatar: string | null;
    googleId: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export class LoginResponse {
    accessToken: string;
    refreshToken: string;
}
