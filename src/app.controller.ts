import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
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
    return {
      message: this.appService.getHello(),
      userData: req.user,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    // req.user contains company info
    const { access_token } = await this._authService.login(req.user);
    return { user: req.user, access_token };
  }
}
