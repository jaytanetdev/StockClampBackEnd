import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BaseResponse } from 'src/core/base-response';
import { assignIgnoreUndefined } from 'src/core/object';
import { GetModelResultDto } from 'src/module/model/dto/get-model.dto';

export class GetOptionResultDto  {
  @ApiProperty()
  @Expose()
  _id: string;

  @ApiProperty()
  @Expose()
  optionName: string;

  @ApiProperty()
  @Expose()
  active: boolean;

  @ApiProperty()
  @Expose()
  createBy: string;

  @ApiProperty()
  @Expose()
  createAt: string;

  @ApiProperty({ type: GetModelResultDto })
  @Expose()
  @Type(() => GetModelResultDto)
  modelId: GetModelResultDto;
}


export class GetOptionResponseDto extends BaseResponse {
  @ApiProperty({
    type: GetOptionResultDto,
    isArray: true,
  })
  @Expose()
  @Type(() => GetOptionResultDto)
  result: GetOptionResultDto[];

  constructor(partial?: Partial<GetOptionResponseDto>) {
    super(partial);
    assignIgnoreUndefined(this, partial);
  }
}
