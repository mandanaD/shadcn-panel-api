import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AuditContext } from './audit.context';
import { BaseEntity } from '../entity/base.entity';
import { Users } from '../modules/users/users.entity';

function hasBaseEntity(entity: unknown): entity is BaseEntity | Users {
  return entity instanceof BaseEntity || entity instanceof Users;
}
@Injectable()
@EventSubscriber()
export class AuditSubscriber implements EntitySubscriberInterface {
  constructor(dataSource: DataSource) {
    if (!dataSource.subscribers.includes(this)) {
      dataSource.subscribers.push(this);
    }
  }

  beforeInsert(event: InsertEvent<unknown>) {
    if (!hasBaseEntity(event.entity)) return;
    const ctx = AuditContext.getStore();
    if (!ctx?.userId) return;

    event.entity._created_by = { id: ctx.userId } as Users;
  }

  beforeUpdate(event: UpdateEvent<unknown>) {
    if (!hasBaseEntity(event.entity)) return;
    const ctx = AuditContext.getStore();
    if (!ctx?.userId) return;

    event.entity._updated_by = { id: ctx.userId } as Users;
  }
}
