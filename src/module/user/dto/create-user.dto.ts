import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Tanet',
    description: 'User first name',
  })
  @IsString()
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'limsumang',
    description: 'User last name',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  lastName: string;

  @ApiProperty({
    example: 'password',
    description: 'Password',
  })
  @IsOptional()
  @MaxLength(100)
  password: string;

  @ApiProperty({
    example: 'GOOGLE',
    description: 'google',
  })
  @IsOptional()
  souce: string;

  @ApiProperty({
    example: '1112312312312',
    description: 'number',
  })
  @IsOptional()
  googleId: string;

  @ApiProperty({
    example: 'UUID',
    description: 'number',
  })
  @IsOptional()
  createBy: string;

  @ApiProperty({
    example: 'UUID',
    description: 'number',
  })
  @IsOptional()
  updateBy: string;
}
