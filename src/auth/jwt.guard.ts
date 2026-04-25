import { AuthGuard } from '@nestjs/passport';

// reject invalid or expired tokens
// will look at the Authorization: Bearer <token> header
export class JwtGuard extends AuthGuard('jwt') {}
