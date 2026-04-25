import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { SignupDto } from './dtos/signup.dto';
import { RefreshDto } from './dtos/refresh.dto';
import { JwtGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signUp(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtGuard)
  @Post('refresh')
  refresh(@Body() refresh: RefreshDto) {
    return this.authService.refresh(refresh.refresh_token);
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  logout(@Body() refresh: RefreshDto) {
    return this.authService.logout(refresh.refresh_token);
  }
}
