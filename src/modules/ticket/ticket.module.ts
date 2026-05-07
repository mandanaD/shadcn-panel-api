import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entity/ticket.entity';
import { Message } from './entity/message.entity';
import { TicketController } from './ticket.controller';
import { JwtStrategy } from '../auth/jwt/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Message])],
  controllers: [TicketController],
  providers: [TicketService, JwtStrategy],
})
export class TicketModule {}
