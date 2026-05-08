import { Controller, Get } from '@nestjs/common';
import { AddressService } from './address.service';
import { Public } from '../../decorator/public.decorator';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get('states')
  @Public()
  getStates() {
    return this.addressService.getStates();
  }

  @Get('cities')
  @Public()
  getCities() {
    return this.addressService.getCities();
  }
}
