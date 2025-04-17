import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BaseResponse } from 'src/core/base-response';
import { assignIgnoreUndefined } from 'src/core/object';
import { ProductResultDto } from './create-product.dto';

export class GetProductResponseDto extends BaseResponse {
  @ApiProperty({
    type: ProductResultDto,
    isArray: true,
  })
  @Expose()
  @Type(() => ProductResultDto)
  result: ProductResultDto[];

  @ApiProperty({ type: Number })
  @Expose()
  total: number;

  @ApiProperty({ type: Number })
  @Expose()
  current: number;

  @ApiProperty({ type: Number })
  @Expose()
  pageSize: number;
  
  constructor(partial?: Partial<GetProductResponseDto>) {
    super(partial);
    assignIgnoreUndefined(this, partial);
  }
}
