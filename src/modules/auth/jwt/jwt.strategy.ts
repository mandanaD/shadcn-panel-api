import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { payloadType } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'super-secret-key',
    });
  }
  // this return as req.user so we can access it with @Req
  validate(payload: payloadType) {
    return {
      id: payload.sub,
      email: payload.email,
      is_admin: payload.is_admin,
    };
  }
}
