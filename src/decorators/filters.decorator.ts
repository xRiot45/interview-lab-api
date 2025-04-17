import { Injectable, SetMetadata } from '@nestjs/common';
import { ClassType } from 'src/types';

export const DECORATOR_KEY = 'isFilters';
export const FILTERS_KEY = 'filters';

export function Filters(filters): ClassDecorator {
    return ((target: ClassType<unknown>) => {
        SetMetadata(DECORATOR_KEY, true)(target);
        SetMetadata(FILTERS_KEY, filters)(target);
        Injectable()(target);
    }) as ClassDecorator;
}
