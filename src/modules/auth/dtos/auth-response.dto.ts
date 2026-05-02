import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/dtos/user.dto';

export class TokenPairDto {
  @Expose()
  @ApiProperty()
  access_token: string;
  @Expose()
  @ApiProperty()
  refresh_token: string;
}

export class AuthResponseDto extends TokenPairDto {
  @Expose()
  @ApiProperty()
  user: User;
}
