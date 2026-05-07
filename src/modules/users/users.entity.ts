import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { RefreshToken } from '../auth/refresh-token.entity';
import { Ticket } from '../ticket/entity/ticket.entity';
import { State } from '../address/entity/state.entity';
import { City } from '../address/entity/city.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ default: false })
  is_admin: boolean;

  @ManyToOne(() => State, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'state_id' })
  state?: State | null;

  @RelationId((s: Users) => s.state)
  state_id: string;

  @ManyToOne(() => City, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'city_id' })
  city?: City | null;

  @RelationId((s: Users) => s.city)
  city_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Users, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'created_by' })
  @Index()
  _created_by: Users;

  @RelationId((entity: Users) => entity._created_by)
  created_by: string;

  @ManyToOne(() => Users, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'updated_by' })
  _updated_by: Users;

  @RelationId((entity: Users) => entity._updated_by)
  updated_by: string;

  @OneToMany(() => RefreshToken, (token) => token._created_by)
  refreshTokens: RefreshToken[];

  @OneToMany(() => Ticket, (ticket) => ticket.owner)
  tickets: Ticket[];
}
