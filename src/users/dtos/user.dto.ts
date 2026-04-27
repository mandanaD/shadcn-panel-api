import { Expose } from 'class-transformer';

export class User {
  @Expose()
  id: string;
  @Expose()
  first_name: string;
  @Expose()
  last_name: string;
  @Expose()
  email: string;
  @Expose()
  bio: string;
  @Expose()
  is_admin: boolean;
  @Expose()
  created_at: Date;
  @Expose()
  updated_at: Date;
}
