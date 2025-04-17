import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDto,
  CreateProductResponseDto,
  ProductResultDto,
} from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model, Types } from 'mongoose';
import { GetProductResponseDto } from './dto/get-product.dto';
import { plainToInstance } from 'class-transformer';
import { GetProductBaseResponseDto, ProductResultGetDto } from './dto/get-product-base.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly ProductModel: Model<ProductDocument>,
  ) {}

  async create(
    dto: CreateProductDto,
    user: any,
  ): Promise<CreateProductResponseDto> {
    const newProduct = new this.ProductModel({
      ...dto,
      optionId: new Types.ObjectId(dto.optionId),
      createBy: user.userId,
    });
    const res = (await newProduct.save()) as ProductResultDto;
    return {
      success: true,
      result: {
        _id: res._id,
        productName: res.productName,
        size: res.size,
        group: res.group,
        cost: res.cost,
        sellingPrice: res.sellingPrice,
        active: res.active,
      },
    };
  }

// product.service.ts
async findByOptionId(optionId: string): Promise<GetProductBaseResponseDto> {
  const result = await this.ProductModel.find({
    optionId: new Types.ObjectId(optionId),
  }).populate('optionId').lean() as unknown as ProductResultGetDto[]

  return new GetProductBaseResponseDto({
    success: true,
    result,
  });
}

  

  async findAll(
    page: number,
    pageSize: number,
  ): Promise<GetProductResponseDto> {
    const skip = (page - 1) * pageSize;

    const [result, total] = await Promise.all([
      this.ProductModel.find()
        .skip(skip)
        .limit(pageSize)
        .lean() as unknown as ProductResultDto[],
      this.ProductModel.countDocuments(),
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
