import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
export enum MaterialEnum {
  PP = 'PP',
  ALMN = 'ALMN',
}

export class CreateMaterialDto {
  @ApiProperty({
    example: MaterialEnum.PP,
    enum: MaterialEnum,
  })
  @IsEnum(MaterialEnum)
  @IsNotEmpty()
  materialName: MaterialEnum;
}
