import { Body, Controller, Delete, Get, Post, Req, Res, UseGuards, Version } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, RegisterResponse } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    @Version('1')
    async registerV1(@Body() req: RegisterDto): Promise<RegisterResponse> {
        return await this.authService.registerV1(req);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @Version('1')
    async login(@Body() req: LoginDto, @Res({ passthrough: true }) res: Response): Promise<{ accessToken: string }> {
        const { accessToken, refreshToken } = await this.authService.loginV1(req);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
        });

        return { accessToken };
    }

    @Post('/refresh-token')
    @Version('1')
    async refreshTokenV1(@Req() req: Request): Promise<{ accessToken: string }> {
        const refreshToken = (req.cookies as { refreshToken: string })['refreshToken'];
        return await this.authService.refreshTokenV1(refreshToken);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    @Version('1')
    async getProfileV1(@Req() req: { user: { userId: number } }) {
        return await this.authService.getProfileV1(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/logout')
    @Version('1')
    logoutV1(@Res({ passthrough: true }) res: Response) {
        this.authService.logoutV1(res);
    }
}
