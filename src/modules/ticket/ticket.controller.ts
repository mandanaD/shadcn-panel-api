import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { Users } from '../users/users.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateTicketDto } from './dtos/update-ticket.dto';

@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Get('')
  @ApiBearerAuth('access-token')
  getTickets() {
    return this.ticketService.getTickets();
  }

  @Post('')
  @ApiBearerAuth('access-token')
  createTicket(
    @Body() ticket: CreateTicketDto,
    @CurrentUser() user: Partial<Users>,
  ) {
    return this.ticketService.createTicket(ticket, user);
  }

  @Get('messages')
  @ApiBearerAuth('access-token')
  getTicketMessages(@Param('id') id: string) {
    return this.ticketService.getTicketMessages(id);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  updateTicket(@Param('id') id: string, @Body() ticket: UpdateTicketDto) {
    return this.ticketService.updateTicket(id, ticket);
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  getTicket(@Param('id') id: string) {
    return this.ticketService.getTicket(id);
  }
}
