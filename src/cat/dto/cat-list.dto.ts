import { ApiProperty } from '@nestjs/swagger';
import { Cat } from '../entities/cat.entity';

export class CatList {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty({ isArray: true, type: Cat })
  cats: Cat[];

  @ApiProperty()
  total: number;
}
