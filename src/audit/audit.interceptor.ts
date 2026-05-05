import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuditContext } from './audit.context';
import { RequestWithUser } from '../modules/users/decorators/current-user.decorator';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const userId = request?.user?.id || null;

    return AuditContext.run({ userId }, () => next.handle());
  }
}
