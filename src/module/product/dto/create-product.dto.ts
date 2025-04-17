import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Date, Types } from 'mongoose';
import { Expose, Type } from 'class-transformer';
import { BaseResponse } from 'src/core/base-response';
import { assignIgnoreUndefined } from 'src/core/object';
import { GetOptionResultDto } from 'src/module/option/dto/get-option.dto';
export class CreateProductDto {
  @ApiProperty({
    example: 'PKL',
  })
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty({
    example: '33.1',
  })
  @IsString()
  @IsNotEmpty()
  size: string;

  @ApiProperty({
    example: '1',
  })
  @IsString()
  @IsNotEmpty()
  group: string;

  @ApiProperty({
    example: 35,
  })
  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @ApiProperty({
    example: 700,
  })
  @IsNumber()
  @IsNotEmpty()
  sellingPrice: number;

  @ApiProperty({
    example: '67fd49bb8f69c035eda499d9',
  })
  @IsString()
  @IsNotEmpty()
  optionId: string;
}

export class ProductResultDto {
  @ApiProperty({
    example: '67fd49bb8f69c035eda499d9',
    type: String,
  })
  @Expose()
  _id: String;

  @ApiProperty({
    example: 'PKL',
    type: String,
  })
  @Expose()
  productName: string;

  @ApiProperty({
    example: '33.4',
    type: String,
  })
  @Expose()
  size: string;

  @ApiProperty({
    example: '1',
    type: String,
  })
  @Expose()
  group: string;

  @ApiProperty({
    example: 35,
    type: Number,
  })
  @Expose()
  cost: number;

  @ApiProperty({
    example: 70,
    type: Number,
  })
  @Expose()
  sellingPrice: number;

  @ApiProperty({
    example: true,
    type: Boolean,
  })
  @Expose()
  active: boolean;

  
}

export class CreateProductResponseDto extends BaseResponse {
  @ApiProperty({
    type: ProductResultDto,
  })
  @Expose()
  @Type(() => ProductResultDto)
  result: ProductResultDto;

  constructor(partial?: Partial<CreateProductResponseDto>) {
    super(partial);
    assignIgnoreUndefined(this, partial);
  }
}
