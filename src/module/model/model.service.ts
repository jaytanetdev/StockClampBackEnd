import { Injectable } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model as ModelSchema, ModelDocument } from './schemas/model.schema';
import { Model, Types } from 'mongoose';
import { GetModelResponseDto, GetModelResultDto } from './dto/get-model.dto';
@Injectable()
export class ModelService {
  constructor(
    @InjectModel(ModelSchema.name)
    private readonly ModelModel: Model<ModelDocument>,
  ) {}
  async create(dto: CreateModelDto, user: any): Promise<ModelDocument> {
    const newModel = new this.ModelModel({
      materialId: new Types.ObjectId(dto.materialId),
      modelName: dto.modelName,
      createBy: user.userId,
    });
    const response = await newModel.save();
    return response;
  }

  async findByMaterialId(materialId: string): Promise<GetModelResponseDto> {
    const result = (await this.ModelModel.find({
      materialId: new Types.ObjectId(materialId),
    }).lean()) as unknown as GetModelResultDto[];

    return {
      success: true,
      result,
    };
  }
}
