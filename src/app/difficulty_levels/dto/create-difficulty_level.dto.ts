import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateDifficultyLevelDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsBoolean()
    @IsNotEmpty()
    readonly isPublished: boolean;
}
