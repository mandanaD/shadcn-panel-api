import { AsyncLocalStorage } from 'async_hooks';

export interface AuditContext {
  userId: string | null;
}

export const AuditContext = new AsyncLocalStorage<AuditContext>();
