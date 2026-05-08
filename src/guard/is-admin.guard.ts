import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_ADMIN_KEY } from '../decorator/admin.decorator';
import { AuditContext } from '../audit/audit.context';
import { UsersService } from '../modules/users/users.service';

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

    const ctx = AuditContext.getStore();
    if (!ctx?.userId) {
      throw new ForbiddenException('User not found.');
    }

    const user = await this.userService.getUser(ctx.userId);

    if (!user || !user.is_admin) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
