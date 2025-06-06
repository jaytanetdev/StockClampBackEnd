import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async login(user: any) {
    const payload = { email: user.query.email, _id: user.query._id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  // เพิ่ม google Login เข้ามา
  async googleLogin(req): Promise<any> {
    if (!req.user) {
      throw new Error('Google login failed: No user information received.');
    }
    
    const { email, name, picture, googleId } = req.user;
    const arrayName = name.split(' ');
    let user = await this.userModel.findOne({ email });
    if (!user) {
      user = new this.userModel({
        email,
        firstName: arrayName[0],
        lastName: arrayName[1],
        souce: 'GOOGLE',
        picture,
        googleId,
      });
      await user.save();
    }
    const payload = { email: user.email, _id: user._id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
