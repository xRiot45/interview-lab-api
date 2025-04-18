import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, RegisterResponse } from './dto/auth.dto';

@Controller('/api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async register(@Body() req: RegisterDto): Promise<RegisterResponse> {
        return this.authService.register(req);
    }
}
