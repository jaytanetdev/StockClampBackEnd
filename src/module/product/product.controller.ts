import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  CreateProductResponseDto,
} from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/decorator/user.decorator';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { GetProductResponseDto } from './dto/get-product.dto';
import { GetQueryPageDto } from './dto/query-page.dto';
import { GetProductBaseResponseDto } from './dto/get-product-base.dto';

@Controller('product')
@UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The product has been successfully created.',
    type: CreateProductResponseDto,
  })
  async create(
    @Body() dto: CreateProductDto,
    @User() user,
  ): Promise<CreateProductResponseDto> {
    const result = await this.productService.create(dto, user);
    return new CreateProductResponseDto(result);
  }


 @Get(':optionId')
  @ApiCreatedResponse({
    type: GetProductBaseResponseDto,
  })
  async findByOptionId(@Param('optionId') optionId: string) :Promise<GetProductBaseResponseDto>{
    const response = await this.productService.findByOptionId(optionId);
    return new GetProductBaseResponseDto(response);
  }



  @Get()
  @ApiCreatedResponse({
    type: GetProductResponseDto,
  })
  async findAll(@Query() query: GetQueryPageDto) {
    const { page, pageSize } = query;
    const result = await this.productService.findAll(page, pageSize);
    return new GetProductResponseDto(result);
  }
}

