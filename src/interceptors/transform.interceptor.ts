import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Interceptor } from 'src/decorators/interceptor.decorator';

interface TransformResponse<T = unknown> {
    status: string;
    data?: T;
}

@Interceptor()
export class TransformInterceptor<T = unknown> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<TransformResponse<T>> {
        return next.handle().pipe(
            map(
                (data): TransformResponse<T> => ({
                    status: 'success',
                    data,
                }),
            ),
        );
    }
}
