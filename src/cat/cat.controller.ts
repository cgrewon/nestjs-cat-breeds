import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CatService } from './cat.service';
import { CatList } from './dto/cat-list.dto';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catService.create(createCatDto);
  }

  @Get()
  findAll(
    @Query('searchName') searchName?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortDirection') sortDirection?: 'ASC' | 'DESC',
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<CatList> {
    return this.catService.findAll(
      searchName,
      sortBy,
      sortDirection,
      page,
      limit,
    );
  }

  @Get(':catId')
  findOne(@Param('catId') catId: string): Promise<Cat> {
    return this.catService.findOne(catId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<Cat> {
    return this.catService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.catService.remove(+id);
  }
}
