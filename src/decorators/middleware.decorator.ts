import { Injectable, SetMetadata } from '@nestjs/common';
import { ClassType } from 'src/types';

export const REPOSITORY_KEY = 'isMiddleware';

export function Middleware(): ClassDecorator {
    return ((target: ClassType<unknown>) => {
        Injectable()(target);
        SetMetadata(REPOSITORY_KEY, true)(target);
    }) as ClassDecorator;
}
