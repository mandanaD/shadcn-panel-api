import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @Expose()
  @ApiProperty()
  id: string;
  @Expose()
  @ApiProperty()
  first_name: string;
  @Expose()
  @ApiProperty()
  last_name: string;
  @Expose()
  @ApiProperty()
  email: string;
  @Expose()
  @ApiProperty()
  bio: string;
  @Expose()
  @ApiProperty()
  is_admin: boolean;
  @Expose()
  @ApiProperty()
  created_at: Date;
  @Expose()
  @ApiProperty()
  updated_at: Date;
}
