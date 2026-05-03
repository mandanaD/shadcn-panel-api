import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../entity/base.entity';

@Entity('refresh_tokens')
export class RefreshToken extends BaseEntity {
  @Column()
  token: string;

  @Column({ type: 'timestamp' })
  expires_at: Date;

  @Column({ default: false })
  revoked: boolean;
}
