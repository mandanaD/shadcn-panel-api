import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './modules/users/users.entity';
import { TicketModule } from './modules/ticket/ticket.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtGuard } from './modules/auth/jwt/jwt.guard';
import { AuditSubscriber } from './audit/audit.user-subscriber';
import { AuditInterceptor } from './audit/audit.interceptor';
import { AddressModule } from './modules/address/address.module';

@Module({
  providers: [
    AuditSubscriber,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'shadcn_panel_db',
      entities: [Users],
      synchronize: true,
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      autoLoadEntities: true,
    }),
    TicketModule,
    AddressModule,
  ],
})
export class AppModule {}
