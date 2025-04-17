import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/decorator/user.decorator';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { GetOptionResponseDto } from './dto/get-option.dto';

@Controller('option')
@UseGuards(AuthGuard('jwt'))
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post()
  create(@Body() dto: CreateOptionDto, @User() user) {
    return this.optionService.create(dto, user);
  }

  @Get(':modalId')
  @ApiCreatedResponse({
    type: GetOptionResponseDto,
  })
  async findByModalId(@Param('modalId') modelId: string) :Promise<GetOptionResponseDto>{
    const response = await this.optionService.findByModalId(modelId);
    return response;
  }

  @Get()
  @ApiCreatedResponse({
    type: GetOptionResponseDto,
  })
  async findAll():Promise<GetOptionResponseDto> {
    const response = await this.optionService.findAll();
    return new GetOptionResponseDto(response);
  }
}
