import { Module } from '@nestjs/common';
import { ControllerModule } from './controller.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthService } from './auth.service';

@Module({
  imports: [ControllerModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
