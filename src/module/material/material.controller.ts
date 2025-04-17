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
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/decorator/user.decorator';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { GetMaterialResponseDto } from './dto/get-material.dto';

@Controller('material')
@UseGuards(AuthGuard('jwt'))
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  create(@Body() dto: CreateMaterialDto, @User() user) {
    return this.materialService.create(dto, user);
  }

  @Get()
  @ApiCreatedResponse({
    type: GetMaterialResponseDto,
  })
  async findAll(): Promise<GetMaterialResponseDto> {
    const result = await this.materialService.findAll();
    return new GetMaterialResponseDto(result);
  }
}
