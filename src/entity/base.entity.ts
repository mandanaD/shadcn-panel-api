import {
  CreateDateColumn,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from '../modules/users/users.entity';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Users, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: '_created_by' })
  @Index()
  _created_by: Users;

  @RelationId((entity: BaseEntity) => entity._created_by)
  created_by: string;

  @ManyToOne(() => Users, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: '_updated_by' })
  _updated_by: Users;

  @RelationId((entity: BaseEntity) => entity._updated_by)
  updated_by: string;
}
