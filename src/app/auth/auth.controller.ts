import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponse, RegisterDto, RegisterResponse } from './dto/auth.dto';

@Controller('/api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async register(@Body() req: RegisterDto): Promise<RegisterResponse> {
        return this.authService.register(req);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Body() req: LoginDto): Promise<LoginResponse> {
        return this.authService.login(req);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    async getProfile(@Req() req: { user: { userId: number } }) {
        return this.authService.getProfile(req.user);
    }
}
