import { BaseEntity } from '../../../entity/base.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { State } from './state.entity';

@Entity()
export class City extends BaseEntity {
  @Column()
  label: string;

  @ManyToOne(() => State, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'state_id' })
  @Index()
  state: State;

  @RelationId((c: City) => c.state)
  state_id: string;
}
