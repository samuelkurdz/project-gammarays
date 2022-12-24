import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt';
import { LocalAuthGuard } from './auth/local';

@Controller()
export class AppController {
  constructor(private _authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@Request() req) {
    // the data in req.user would be used in subsequent request
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    // console.log(req.user);
    // req.user contains person info after successful find in the LocalStrategy validate
    const { access_token } = await this._authService.login(req.user);
    return { user: req.user, access_token };
  }
}
