import { AuthGuard } from '@nestjs/passport';
import { Guard } from 'src/decorators/guard.decorator';

@Guard()
export class JwtAuthGuard extends AuthGuard('jwt') {}
