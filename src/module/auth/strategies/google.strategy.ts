import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    const google = configService.get('google'); 
    super({
      clientID:google.googleClientId,
      clientSecret: google.googleClientSecret,
      callbackURL:`${google.backEndURL}/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, emails, photos } = profile;
    const { givenName, familyName } = profile.name || {}; 

    const user = {
      googleId: id,
      email: emails[0].value,
      name: `${givenName} ${familyName}`,
      picture: photos[0].value,
      refreshToken,
      accessToken,
    };
    done(null, user);
  }
}


@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}