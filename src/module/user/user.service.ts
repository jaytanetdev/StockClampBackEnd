import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { GetUserResponseDto, GetUserResultDto } from './dto/get-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async create(registerDTO: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(registerDTO);
    const user = await newUser.save();
    return user;
  }
  async findByEmail(user: any): Promise<GetUserResponseDto> {
    const res = (await this.userModel.findOne({
      email: user.email,
    })) as GetUserResultDto;
    if (!res) {
      throw new NotFoundException('User not found');
    }
    return {
      success: true,
      result: {
        _id: res._id,
        email: res.email,
        firstName: res.firstName,
        lastName: res.lastName,
      },
    };
  }
}
