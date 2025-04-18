import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express'; // ต้อง import Request ด้วย
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          let token = null;
 
          if (req && req.cookies) {
             token = req.cookies['access_token']; // ดึง token จาก cookie
           }
          return token;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(), // fallback ถ้าไม่เจอใน cookie จะดูใน Header แทน
      ]),
      secretOrKey: 'JJSECRET',
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return {
      userId: new Types.ObjectId(payload._id), // 👈 แปลงให้เป็น ObjectId
      email: payload.email,
    };
  }
}
