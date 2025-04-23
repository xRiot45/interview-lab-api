import { Body, Controller, Get, Post, Query, Req, Version } from '@nestjs/common';
import { Request } from 'express';
import { PaginatedResponse, PaginationQuery } from 'src/types/pagination';
import { CreateLanguageDto } from './dto/create-language.dto';
import { LanguageResponse } from './dto/language.dto';
import { LanguagesService } from './languages.service';

@Controller('languages')
export class LanguagesController {
    constructor(private readonly languagesService: LanguagesService) {}

    @Post()
    @Version('1')
    async createV1(@Body() req: CreateLanguageDto): Promise<LanguageResponse> {
        return await this.languagesService.createV1(req);
    }

    @Get()
    @Version('1')
    async findAllV1(
        @Req() req: Request,
        @Query() query: PaginationQuery,
    ): Promise<PaginatedResponse<LanguageResponse>> {
        const raw = req.query as Record<string, string>;
        const filter: Record<string, string> = {};
        Object.keys(raw).forEach((k) => {
            if (k.startsWith('filter.')) {
                filter[k.split('.')[1]] = raw[k];
            }
        });

        return this.languagesService.findAllV1({ ...query, filter }, req);
    }
}
