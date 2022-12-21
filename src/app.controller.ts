import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt';
import { LocalAuthGuard } from './auth/local';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private _authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@Request() req) {
    const jwt = req.headers.authorization.replace('Bearer ', '');
    return this._authService.validateAuthToken(jwt);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    // req.user contains person info after successful find in the LocalStrategy validate
    console.log(req.user);
    const { access_token } = await this._authService.login(req.user);
    return { user: req.user, access_token };
  }
}
