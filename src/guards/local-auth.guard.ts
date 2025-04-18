import { AuthGuard } from '@nestjs/passport';
import { Guard } from 'src/decorators/guard.decorator';

@Guard()
export class LocalAuthGuard extends AuthGuard('local') {}
