import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_ADMIN_KEY } from '../decorator/admin.decorator';
import { UsersService } from '../modules/users/users.service';
import { RequestWithUser } from '../modules/users/decorators/current-user.decorator';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isAdmin = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!isAdmin) return true;

    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const reqUser = req.user;

    if (!reqUser?.id) {
      throw new UnauthorizedException('User not found.');
    }

    const user = await this.userService.getUser(reqUser.id);

    if (!user || !user.is_admin) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
