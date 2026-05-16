import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { SignupDto } from './dtos/signup.dto';
import { RefreshDto } from './dtos/refresh.dto';
import { AuthResponseDto, TokenPairDto } from './dtos/auth-response.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Public } from '../../decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  @Public()
  @ApiCreatedResponse({ type: AuthResponseDto })
  signUp(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  @Public()
  @ApiOkResponse({ type: AuthResponseDto })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @Public()
  @ApiOkResponse({ type: TokenPairDto })
  refresh(@Body() refresh: RefreshDto) {
    return this.authService.refresh(refresh.refresh_token);
  }

  @Post('logout')
  @ApiNoContentResponse()
  logout(@Body() refresh: RefreshDto) {
    return this.authService.logout(refresh.refresh_token);
  }
}
