import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BaseResponse } from 'src/core/base-response';
import { assignIgnoreUndefined } from 'src/core/object';
import {  GetOrderResultDto } from './get-order.dto';

export class GetOrderResDto extends BaseResponse {
  @ApiProperty({
    type: GetOrderResultDto,
    isArray: true,
  })
  @Expose()
  @Type(() => GetOrderResultDto)
  result: GetOrderResultDto[];

  @ApiProperty({ type: Number })
  @Expose()
  total: number;

  @ApiProperty({ type: Number })
  @Expose()
  current: number;

  @ApiProperty({ type: Number })
  @Expose()
  pageSize: number;
  
  constructor(partial?: Partial<GetOrderResDto>) {
    super(partial);
    assignIgnoreUndefined(this, partial);
  }
}

