import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
export enum StatusEnum {
  OPEN = 'OPEN',
  FINISH = 'FINISH',
  CANCEL = 'CANCEL',
}
export class OrderItemDto {
  @ApiProperty({ example: '67fd49bb8f69c035eda499d9' })
  @IsNotEmpty()
  @IsMongoId()
  productId: string;

  @ApiProperty()
  @IsString()
  productName: string;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value?.toString().replace(/,/g, '')))
  @IsNumber()
  amount: number;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value?.toString().replace(/,/g, '')))
  @IsNumber()
  costEA: number;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value?.toString().replace(/,/g, '')))
  @IsNumber()
  sellingPriceEA: number;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value?.toString().replace(/,/g, '')))
  @IsNumber()
  sellingPriceNet: number;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  platform: string;
  @ApiProperty()
  @Transform(({ value }) => parseFloat(value?.toString().replace(/,/g, '')))
  @IsNumber()
  tax: number;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value?.toString().replace(/,/g, '')))
  @IsNumber()
  expenses: number;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value?.toString().replace(/,/g, '')))
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value?.toString().replace(/,/g, '')))
  @IsNumber()
  @IsNotEmpty()
  totalExpenses: number;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value?.toString().replace(/,/g, '')))
  @IsNumber()
  @IsNotEmpty()
  profitNet: number;

  @ApiProperty({
    example: StatusEnum.OPEN,
    enum: StatusEnum,
  })
  @IsEnum(StatusEnum)
  @IsNotEmpty()
  status: StatusEnum;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderList: OrderItemDto[];

  @ApiProperty()
  @IsBoolean()
  active: boolean;
}
