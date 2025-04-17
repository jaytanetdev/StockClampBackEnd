import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BaseResponse } from 'src/core/base-response';
import { assignIgnoreUndefined } from 'src/core/object';
import { ProductResultDto } from 'src/module/product/dto/create-product.dto';
import { StatusEnum } from './create-order.dto';

export class GetOrderResultDto {
  @ApiProperty()
  @Expose()
  _id: string;

  @ApiProperty({
    example: StatusEnum.OPEN,
    enum: StatusEnum,
  })
  @Expose()
  status: StatusEnum;

  @ApiProperty()
  @Expose()
  cost: number;

  @ApiProperty()
  @Expose()
  sellingPrice: number;

  @ApiProperty()
  @Expose()
  expenses: number;

  @ApiProperty()
  @Expose()
  profit: number;

  @ApiProperty()
  @Expose()
  active: boolean;

  @ApiProperty()
  @Expose()
  createBy: string;

  @ApiProperty()
  @Expose()
  createAt: string;

  @ApiProperty({ type: ProductResultDto })
  @Expose()
  @Type(() => ProductResultDto)
  ProductId: ProductResultDto;
}

export class GetOrderResponseDto extends BaseResponse {
  @ApiProperty({
    type: GetOrderResultDto,
    isArray: true,
  })
  @Expose()
  @Type(() => GetOrderResultDto)
  result: GetOrderResultDto[];

  constructor(partial?: Partial<GetOrderResponseDto>) {
    super(partial);
    assignIgnoreUndefined(this, partial);
  }
}
