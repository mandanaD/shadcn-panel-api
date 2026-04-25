import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Users } from '../users.entity';

interface RequestWithUser extends Request {
  user: Partial<Users>;
}
export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext): Partial<Users> => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
