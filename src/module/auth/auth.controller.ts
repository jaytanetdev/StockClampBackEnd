import { Controller, Get, Post, UseGuards, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

import { Response } from 'express';
import { GoogleAuthGuard } from './strategies/google.strategy';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  async login(@Request() req, @Res() res: Response) {
    const { accessToken } = await this.authService.login(req);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
    });
    return res.json({ message: 'login success' ,token:accessToken});
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) {
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req, @Res() res: Response) {
    const { accessToken } = await this.authService.googleLogin(req);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
    });
    res.redirect(`${process.env.FRONTEND_HOSTNAME}/dashboard`);
  }
  // เพิ่ม logout
  @Get('logout')
  async logout(@Request() req, @Res() res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
    });
    return res.json({ message: 'Successfully logged out' });
  }
}