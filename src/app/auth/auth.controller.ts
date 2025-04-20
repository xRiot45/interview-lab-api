import { Body, Controller, Delete, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, RegisterResponse } from './dto/auth.dto';

@Controller('/api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async register(@Body() req: RegisterDto): Promise<RegisterResponse> {
        return await this.authService.register(req);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() req: LoginDto, @Res({ passthrough: true }) res: Response): Promise<{ accessToken: string }> {
        const { accessToken, refreshToken } = await this.authService.login(req);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
        });

        return { accessToken };
    }

    @Post('/refresh-token')
    async refreshToken(@Req() req: Request): Promise<{ accessToken: string }> {
        const refreshToken = (req.cookies as { refreshToken: string })['refreshToken'];
        return await this.authService.refreshToken(refreshToken);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    async getProfile(@Req() req: { user: { userId: number } }) {
        return await this.authService.getProfile(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/logout')
    logout(@Res({ passthrough: true }) res: Response) {
        this.authService.logout(res);
    }
}
