import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { Model, Types } from 'mongoose';
import { ProductDocument } from '../product/schemas/product.schema';
import { GetOrderResponseDto, GetOrderResultDto } from './dto/get-order.dto';
import { GetOrderResDto } from './dto/get-response-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly OrderModel: Model<OrderDocument>,
  ) {}

  async create(dto: CreateOrderDto, user: any): Promise<OrderDocument> {
    const newOrder = new this.OrderModel({
      ...dto,
      productId: new Types.ObjectId(dto.productId),
      createBy: user.userId,
    });
    const response = await newOrder.save();
    return response;
  }

  async findAll(page: number, pageSize: number): Promise<GetOrderResDto> {
    const skip = (page - 1) * pageSize;

    const [result, total] = await Promise.all([
      this.OrderModel.find()
        .skip(skip)
        .limit(pageSize)
        .lean() as unknown as GetOrderResultDto[],
      this.OrderModel.countDocuments(),
    ]);

    return {
      success: true,
      result,
      total,
      current: page,
      pageSize,
    };
  }
}
