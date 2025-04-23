import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateLanguageDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsBoolean()
    @IsNotEmpty()
    readonly isPublished: boolean;
}
