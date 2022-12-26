import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ILoggedInUser } from '../interfaces';

export const LoggedInUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as ILoggedInUser;
  },
);
