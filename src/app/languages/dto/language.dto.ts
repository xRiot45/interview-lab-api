import { Expose } from 'class-transformer';

export class LanguageResponse {
    @Expose()
    readonly id: number;

    @Expose()
    readonly name: string;

    @Expose()
    readonly isPublished: boolean;

    @Expose()
    readonly createdAt: Date;

    @Expose()
    readonly updatedAt: Date;
}
