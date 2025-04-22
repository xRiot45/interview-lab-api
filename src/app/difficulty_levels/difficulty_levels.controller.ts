import { Body, Controller, Get, Param, Patch, Post, Query, Req, Version } from '@nestjs/common';
import { Request } from 'express';
import { PaginatedResponse, PaginationQuery } from 'src/types/pagination';
import { DifficultyLevelsService } from './difficulty_levels.service';
import { CreateDifficultyLevelDto } from './dto/create-difficulty_level.dto';
import { DifficultyLevelResponse } from './dto/difficulty_level.dto';
import { UpdateDifficultyLevelDto } from './dto/update-difficulty_level.dto';

@Controller('difficulty-levels')
export class DifficultyLevelsController {
    constructor(private readonly difficultyLevelsService: DifficultyLevelsService) {}

    @Post()
    @Version('1')
    async createV1(@Body() req: CreateDifficultyLevelDto): Promise<DifficultyLevelResponse> {
        return await this.difficultyLevelsService.createV1(req);
    }

    @Get()
    @Version('1')
    async findAllV1(
        @Req() req: Request,
        @Query() query: PaginationQuery,
    ): Promise<PaginatedResponse<DifficultyLevelResponse>> {
        const raw = req.query as Record<string, string>;
        const filter: Record<string, string> = {};
        Object.keys(raw).forEach((k) => {
            if (k.startsWith('filter.')) {
                filter[k.split('.')[1]] = raw[k];
            }
        });

        return this.difficultyLevelsService.findAllV1({ ...query, filter }, req);
    }

    @Get('/:id')
    @Version('1')
    async findByIdV1(@Param('id') id: number): Promise<DifficultyLevelResponse> {
        return await this.difficultyLevelsService.findByIdV1(id);
    }

    @Patch('/:id')
    @Version('1')
    async updateV1(
        @Param('id') id: number,
        @Body() req: UpdateDifficultyLevelDto,
    ): Promise<DifficultyLevelResponse | null> {
        return await this.difficultyLevelsService.updateV1(id, req);
    }
}
