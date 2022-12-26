import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ILoggedInUser } from 'src/global';
import { AuthService } from '../auth.service';

// export const getClient = <T = Client>(ctx: ExecutionContext): T => {
// https://github.com/DenzelCode/nest-auth/blob/7c42c344b421c26a2b561a6afb24547839a6652c/src/features/auth/guard/jwt-auth.guard.ts#L55
//   switch (ctx.getType()) {
//     case 'ws':
//       return ctx.switchToWs().getClient().handshake;
//     case 'http':
//       return ctx.switchToHttp().getRequest();
//     default:
//       return undefined;
//   }
// };

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private _jwtService: JwtService,
    private _authService: AuthService,
  ) {
    super();
  }
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    if (!request.headers.authorization) throw new UnauthorizedException();
    const jwt = request.headers.authorization.replace('Bearer ', '');
    try {
      const { _id, apps, company, email, isWorker } =
        await this._authService.isTokenValid(jwt);
      request.user = { _id, apps, company, email, isWorker };
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
