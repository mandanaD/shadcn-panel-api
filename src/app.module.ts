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
import { IsAdminGuard } from './guard/is-admin.guard';
import { Message } from './modules/ticket/entity/message.entity';
import { Ticket } from './modules/ticket/entity/ticket.entity';
import { City } from './modules/address/entity/city.entity';
import { State } from './modules/address/entity/state.entity';
import { RefreshToken } from './modules/auth/refresh-token.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [
    AuditSubscriber,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: IsAdminGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [Users, Message, Ticket, City, State, RefreshToken],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    TicketModule,
    AddressModule,
  ],
})
export class AppModule {}
