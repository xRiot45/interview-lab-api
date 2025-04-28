import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

export const GetUserId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (user) {
        return user;
    } else {
        throw new UnauthorizedException('Unauthorized');
    }
});
