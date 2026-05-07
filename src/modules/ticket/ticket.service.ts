import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entity/ticket.entity';
import { Repository } from 'typeorm';
import { Message } from './entity/message.entity';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { Users } from '../users/users.entity';
import { UpdateTicketDto } from './dtos/update-ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket) private ticketRepo: Repository<Ticket>,
    @InjectRepository(Message) private messageRepo: Repository<Message>,
  ) {}
  async getTicket(id: string) {
    const ticket = await this.ticketRepo.findOne({
      where: { id },
      relations: ['messages', 'owner'],
    });
    if (ticket) {
      return ticket;
    }
    throw new NotFoundException('Ticket not found');
  }
  async createTicket(body: CreateTicketDto, user: Partial<Users>) {
    const ticketBody = this.ticketRepo.create({
      ...body,
      owner: { id: body.owner || user.id } as Users,
    });
    const ticket = await this.ticketRepo.save(ticketBody);

    const messageBody = this.messageRepo.create({
      body: body.message,
      ticket: ticket,
    });
    await this.messageRepo.save(messageBody);

    return this.getTicket(ticket.id);
  }

  async updateTicket(id: string, body: UpdateTicketDto) {
    const ticket = await this.ticketRepo.findOne({
      where: { id },
    });
    if (!ticket) {
      throw new NotFoundException(`Ticket not found`);
    } else {
      const ticketBody = Object.assign(ticket, body);
      return await this.ticketRepo.save(ticketBody);
    }
  }

  getTickets() {
    return this.ticketRepo.find();
  }

  async getTicketMessages(id: string) {
    const ticket = await this.getTicket(id);
    if (ticket) {
      return this.messageRepo.find({
        where: { ticket_id: ticket.id },
      });
    }
  }
}
