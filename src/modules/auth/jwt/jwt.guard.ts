import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../../../decorator/public.decorator';

// reject invalid or expired tokens
// will look at the Authorization: Bearer <token> header
@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  // reflector allow use to access the metadata pass by custom decorator to route or class
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
