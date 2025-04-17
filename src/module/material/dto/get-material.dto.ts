import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Types } from 'mongoose';
import { BaseResponse } from 'src/core/base-response';
import { assignIgnoreUndefined } from 'src/core/object';

export class GetMaterialResultDto {
  @ApiProperty()
  @Expose()
  _id: string;

  @ApiProperty()
  @Expose()
  materialName: string;

  @ApiProperty()
  @Expose()
  active: boolean;

  @ApiProperty()
  @Expose()
  createBy: string;

  @ApiProperty()
  @Expose()
  createAt: string;
}

export class GetMaterialResponseDto extends BaseResponse {
  @ApiProperty({
    type: GetMaterialResultDto,
    isArray: true,
  })
  @Expose()
  @Type(() => GetMaterialResultDto)
  result: GetMaterialResultDto[];

  constructor(partial?: Partial<GetMaterialResponseDto>) {
    super(partial);
    assignIgnoreUndefined(this, partial);
  }
}
