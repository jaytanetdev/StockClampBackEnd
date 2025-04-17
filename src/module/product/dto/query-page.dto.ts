import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetQueryPageDto {
  @ApiProperty({ example: 1, description: 'Page number' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiProperty({ example: 10, description: 'Items per page' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize: number = 10;
}
