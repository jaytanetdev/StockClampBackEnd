import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Option, OptionDocument } from './schemas/option.schema';
import { Model, Types } from 'mongoose';
import { GetOptionResponseDto, GetOptionResultDto } from './dto/get-option.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class OptionService {
  constructor(
    @InjectModel(Option.name)
    private readonly OptionModel: Model<OptionDocument>,
  ) {}
  async create(dto: CreateOptionDto, user: any): Promise<OptionDocument> {
    const newModel = new this.OptionModel({
      modelId: new Types.ObjectId(dto.modelId),
      optionName: dto.optionName,
      createBy: user.userId,
    });
    const response = await newModel.save();
    return response;
  }

  async findByModalId(modelId: string): Promise<GetOptionResponseDto> {
    if (!Types.ObjectId.isValid(modelId)) {
      throw new BadRequestException('Invalid modelId');
    }

    const result = (await this.OptionModel.find({
      modelId: new Types.ObjectId(modelId),
    }).sort({_id:1}).populate('modelId')) as unknown as GetOptionResultDto[];

    return {
      success: true,
      result,
    };
  }

  async findAll(): Promise<GetOptionResponseDto> {
    const response = await this.OptionModel.find().populate({
      path: 'modelId',
      populate: {
        path: 'materialId',
        model: 'Material',
      },
    });

    const result = plainToInstance(GetOptionResultDto, response, {
      excludeExtraneousValues: true,
    });

    return {
      success: true,
      result,
    };
  }
}
