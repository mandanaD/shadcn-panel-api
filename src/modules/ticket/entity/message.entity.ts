import { BaseEntity } from '../../../entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity()
export class Message extends BaseEntity {
  @Column()
  body: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.messages)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;

  @RelationId((entity: Message) => entity.ticket)
  ticket_id: string;
}
