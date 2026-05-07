import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { BaseEntity } from '../../../entity/base.entity';
import { Users } from '../../users/users.entity';
import { Message } from './message.entity';

@Entity()
export class Ticket extends BaseEntity {
  @Column()
  subject: string;

  @ManyToOne(() => Users, (user) => user.tickets)
  @JoinColumn({ name: 'owner_id' })
  owner: Users;

  @RelationId((entity: Ticket) => entity.owner)
  owner_id: string;

  @OneToMany(() => Message, (message) => message.ticket)
  messages: Message[];
}
