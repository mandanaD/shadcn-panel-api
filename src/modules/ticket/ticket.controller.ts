import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { Users } from '../users/users.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateTicketDto } from './dtos/update-ticket.dto';
import { CPMessageDto } from './dtos/cp-message.dto';
import { QueryDto } from '../../dto/query.dto';

@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Get('')
  @ApiBearerAuth('access-token')
  getTickets(@Query() query: QueryDto) {
    return this.ticketService.getTickets(query);
  }

  @Post('')
  @ApiBearerAuth('access-token')
  createTicket(
    @Body() ticket: CreateTicketDto,
    @CurrentUser() user: Partial<Users>,
  ) {
    return this.ticketService.createTicket(ticket, user);
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

  @Delete(':id')
  @ApiBearerAuth('access-token')
  deleteTicket(@Param('id') id: string) {
    return this.ticketService.deleteTicket(id);
  }

  @Get(':id/messages')
  @ApiBearerAuth('access-token')
  getTicketMessages(@Param('id') id: string) {
    return this.ticketService.getTicketMessages(id);
  }

  @Post('messages')
  @ApiBearerAuth('access-token')
  createMessage(@Param('id') id: string, @Body() body: CPMessageDto) {
    return this.ticketService.createMessage(id, body);
  }

  @Patch('messages/:id')
  @ApiBearerAuth('access-token')
  updateMessage(@Param('id') id: string, @Body() body: CPMessageDto) {
    return this.ticketService.updateMessage(id, body);
  }

  @Get('messages/:id')
  @ApiBearerAuth('access-token')
  getMessage(@Param('id') id: string) {
    return this.ticketService.getMessage(id);
  }

  @Delete('messages/:id')
  @ApiBearerAuth('access-token')
  deleteMessage(@Param('id') id: string) {
    return this.ticketService.deleteMessage(id);
  }
}
