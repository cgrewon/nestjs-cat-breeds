import { ApiProperty } from '@nestjs/swagger';

export class DeleteResultDB {
  @ApiProperty({ required: false })
  affected?: number | null;
}
