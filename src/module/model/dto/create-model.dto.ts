import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
export class CreateModelDto {
  @ApiProperty({
    example: 'standart',
  })
  @IsString()
  @IsNotEmpty()
  modelName: string;

  
  @ApiProperty({
    example: '67fd49bb8f69c035eda499d9',
  })
  @IsNotEmpty()
  materialId: Types.ObjectId;
}
