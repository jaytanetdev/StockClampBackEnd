import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BaseResponse } from 'src/core/base-response';
import { assignIgnoreUndefined } from 'src/core/object';
import { GetMaterialResultDto } from 'src/module/material/dto/get-material.dto';

export class GetModelResultDto {
  @ApiProperty()
  @Expose()
  _id: string;

  @ApiProperty()
  @Expose()
  modelName: string;

  @ApiProperty()
  @Expose()
  active: boolean;

  @ApiProperty()
  @Expose()
  createBy: string;

  @ApiProperty()
  @Expose()
  createAt: string;

  @ApiProperty()
  @Expose()
  __v: number;

  @ApiProperty({ type: GetMaterialResultDto })
  @Expose()
  @Type(() => GetMaterialResultDto)
  materialId: GetMaterialResultDto;
}

export class GetModelResponseDto extends BaseResponse {
  @ApiProperty({
    type: GetModelResultDto,
    isArray: true,
  })
  @Expose()
  @Type(() => GetModelResultDto)
  result: GetModelResultDto[];

  constructor(partial?: Partial<GetModelResponseDto>) {
    super(partial);
    assignIgnoreUndefined(this, partial);
  }
}
