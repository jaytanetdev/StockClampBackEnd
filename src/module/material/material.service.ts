import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Material, MaterialDocument } from './schemas/material.schema';
import { Model } from 'mongoose';
import {
  GetMaterialResponseDto,
  GetMaterialResultDto,
} from './dto/get-material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectModel(Material.name)
    private readonly MaterialModel: Model<MaterialDocument>,
  ) {}
  async create(dto: CreateMaterialDto, user: any): Promise<MaterialDocument> {
    const newMaterial = new this.MaterialModel({
      ...dto,
      createBy: user.userId,
    });
    const response = await newMaterial.save();
    return response;
  }
  async findAll(): Promise<GetMaterialResponseDto> {
    const result =
      (await this.MaterialModel.find().sort({_id:1}).lean()) as unknown as GetMaterialResultDto[];

    return {
      success: true,
      result,
    };
  }
}
