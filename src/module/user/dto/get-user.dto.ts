import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Types } from 'mongoose';
import { BaseResponse } from 'src/core/base-response';
import { assignIgnoreUndefined } from 'src/core/object';

export class GetUserResultDto {
  @ApiProperty({
    example: '67fd49bb8f69c035eda499d9',
    type: String,
  })
  @Expose()
  _id: Types.ObjectId;

  @ApiProperty({
    example: 'jaytanet01@gmail.com',
    type: String,
  })
  @Expose()
  email: string;

  @ApiProperty({
    example: 'tanet',
    type: String,
  })
  @Expose()
  firstName: string;

  @ApiProperty({
    example: 'lastname',
    type: String,
  })
  @Expose()
  lastName: String;
}

export class GetUserResponseDto extends BaseResponse {
  @ApiProperty({
    type: GetUserResultDto,
    isArray: false,
  })
  @Expose()
  @Type(() => GetUserResultDto)
  result: GetUserResultDto;

  constructor(partial?: Partial<GetUserResponseDto>) {
    super(partial);
    assignIgnoreUndefined(this, partial);
  }
}
