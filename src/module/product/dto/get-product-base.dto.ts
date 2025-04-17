import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BaseResponse } from 'src/core/base-response';
import { assignIgnoreUndefined } from 'src/core/object';
import { ProductResultDto } from './create-product.dto';
import { GetOptionResultDto } from 'src/module/option/dto/get-option.dto';

export class ProductResultGetDto extends ProductResultDto {
  @ApiProperty({ type: GetOptionResultDto })
  @Expose()
  @Type(() => GetOptionResultDto)
  optionId: GetOptionResultDto;
}

export class GetProductBaseResponseDto extends BaseResponse {
  @ApiProperty({
    type: ProductResultGetDto,
    isArray: true,
  })
  @Expose()
  @Type(() => ProductResultGetDto)
  result: ProductResultGetDto[];

  constructor(partial?: Partial<GetProductBaseResponseDto>) {
    super(partial);
    assignIgnoreUndefined(this, partial);
  }
}
