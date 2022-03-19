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
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { SortDirerction } from 'src/enum/sort-direction.enum';
import { DeleteResultDB } from 'src/types/delete-result.type';
import { DeleteResult } from 'typeorm';
import { CatService } from './cat.service';
import { CatList } from './dto/cat-list.dto';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Controller('cats')
@ApiTags('Cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  @ApiBadRequestResponse({ description: 'catId is duplicated.' })
  @ApiOkResponse({ type: Cat })
  create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catService.create(createCatDto);
  }

  @Get()
  @ApiQuery({
    name: 'searchName',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'sortDirection',
    enum: SortDirerction,
    enumName: 'SortDirection',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: '1 based in',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOkResponse({ type: CatList, isArray: true })
  findAll(
    @Query('searchName') searchName?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortDirection') sortDirection?: SortDirerction,
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
  @ApiParam({ name: 'catId', type: String })
  @ApiOkResponse({ type: Cat })
  @ApiBadRequestResponse({ description: 'catId is invalid.' })
  findOne(@Param('catId') catId: string): Promise<Cat> {
    return this.catService.findOne(catId);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBadRequestResponse({ description: 'Id is invalid.' })
  @ApiOkResponse({ type: Cat })
  update(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<Cat> {
    return this.catService.update(+id, updateCatDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: DeleteResultDB })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.catService.remove(+id);
  }
}
