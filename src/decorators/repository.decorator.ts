import { Injectable, SetMetadata } from '@nestjs/common';
import { ClassType } from 'src/types';
import { EntityTarget } from 'typeorm';

export const REPOSITORY_KEY = 'isRepository';
export const ENTITY_KEY = 'entity';

export function Repository(entity: EntityTarget<unknown>): ClassDecorator {
    return ((target: ClassType<unknown>) => {
        SetMetadata(REPOSITORY_KEY, true)(target);
        SetMetadata(ENTITY_KEY, entity)(target);
        Injectable()(target);
    }) as ClassDecorator;
}
