import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @Column({ type: 'timestamp' })
  expires_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @Column({ default: false })
  revoked: boolean;

  @ManyToOne(() => Users, (users) => users.refreshTokens, {
    onDelete: 'CASCADE',
    // if user deleted then delete this token as well
  })
  user: Users;
}
