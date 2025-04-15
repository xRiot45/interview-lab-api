import { Injectable, SetMetadata } from '@nestjs/common';
import { ClassType } from 'src/types';

export const SERVICE_KEY = 'isService';

export function Service(): ClassDecorator {
    return ((target: ClassType<unknown>) => {
        Injectable()(target);
        SetMetadata(SERVICE_KEY, true)(target);
    }) as ClassDecorator;
}
