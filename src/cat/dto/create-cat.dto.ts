import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty()
  catId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  breed: string;

  @ApiProperty()
  weight: number;
}
