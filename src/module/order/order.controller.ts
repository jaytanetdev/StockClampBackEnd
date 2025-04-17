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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/decorator/user.decorator';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { GetOrderResponseDto } from './dto/get-order.dto';
import { GetOrderResDto } from './dto/get-response-order.dto';
import { GetQueryPageDto } from '../product/dto/query-page.dto';

@Controller('order')
@UseGuards(AuthGuard('jwt'))
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() dto: CreateOrderDto, @User() user) {
    return this.orderService.create(dto, user);
  }

  @Get()
  @ApiCreatedResponse({
    type: GetOrderResDto,
  })
  async findAll(@Query() query: GetQueryPageDto): Promise<GetOrderResDto> {
    const { page, pageSize } = query;
    const result = await this.orderService.findAll(page, pageSize);
    return new GetOrderResDto(result);
  }
}
