import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './decorator/user.decorator';
import { GetUserResponseDto } from './dto/get-user.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerDTO: CreateUserDto) {
    return this.userService.create(registerDTO);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiCreatedResponse({
    type: GetUserResponseDto,
  })
  async getProfile(@User() user): Promise<GetUserResponseDto> {
    const result = await this.userService.findByEmail(user);
    return new GetUserResponseDto(result);
  }
}
