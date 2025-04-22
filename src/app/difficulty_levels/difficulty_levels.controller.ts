import { Body, Controller, Post, Version } from '@nestjs/common';
import { DifficultyLevelsService } from './difficulty_levels.service';
import { CreateDifficultyLevelDto } from './dto/create-difficulty_level.dto';
import { DifficultyLevelResponse } from './dto/difficulty_level.dto';

@Controller('difficulty-levels')
export class DifficultyLevelsController {
    constructor(private readonly difficultyLevelsService: DifficultyLevelsService) {}

    @Post()
    @Version('1')
    async createV1(@Body() req: CreateDifficultyLevelDto): Promise<DifficultyLevelResponse> {
        return await this.difficultyLevelsService.createV1(req);
    }
}
