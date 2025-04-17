import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';



export class CreateOptionDto {
  @ApiProperty({
    example: 'standart',
  })
  @IsString()
  @IsNotEmpty()
  optionName: string;

  @ApiProperty({
    example: '67fd49bb8f69c035eda499d9',
  })
  @IsNotEmpty()
  modelId: Types.ObjectId;


}




