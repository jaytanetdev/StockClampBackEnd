import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export enum StatusEnum {
  OPEN = 'OPEN',
  FINISH = 'FINISH',
  CANCEL = 'CANCEL',
}

import { Types } from 'mongoose';
export class CreateOrderDto {
  @ApiProperty({
    example: '67fd49bb8f69c035eda499d9',
  })
  @IsNotEmpty()
  productId: Types.ObjectId;

  @ApiProperty({
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: StatusEnum.OPEN,
    enum: StatusEnum,
  })
  @IsEnum(StatusEnum)
  @IsNotEmpty()
  status: StatusEnum;

  @ApiProperty({
    example: 5000,
  })
  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @ApiProperty({
    example: 10000,
  })
  @IsNumber()
  @IsNotEmpty()
  sellingPrice: number;

  @ApiProperty({
    example: 50,
  })
  @IsNumber()
  @IsNotEmpty()
  expenses: number;

  @ApiProperty({
    example: 5000,
  })
  @IsNumber()
  @IsNotEmpty()
  profit: number;
}
