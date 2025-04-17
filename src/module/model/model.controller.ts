import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/decorator/user.decorator';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { GetModelResponseDto } from './dto/get-model.dto';

@Controller('model')
@UseGuards(AuthGuard('jwt'))
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post()
  create(@Body() dto: CreateModelDto, @User() user) {
    return this.modelService.create(dto, user);
  }

  @Get(':materialId')
  @ApiCreatedResponse({
    type: GetModelResponseDto,
  })
  async findByMaterialId(
    @Param('materialId') materialId: string,
  ): Promise<GetModelResponseDto> {
    const result = await this.modelService.findByMaterialId(materialId);
    return new GetModelResponseDto(result);
  }
}
