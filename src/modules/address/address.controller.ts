import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { Public } from '../../decorator/public.decorator';
import { CpStateDto } from './dtos/cp-state.dto';
import { CPCityDto } from './dtos/cp-city.dto';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get('states')
  @Public()
  getStates() {
    return this.addressService.getStates();
  }

  @Post('states')
  @Public()
  createState(@Body() body: CpStateDto) {
    return this.addressService.createState(body);
  }

  @Get('states/:id')
  @Public()
  getState(@Param('id') id: string) {
    return this.addressService.getState(id);
  }

  @Patch('states/:id')
  @Public()
  editState(@Param('id') id: string, @Body() state: CpStateDto) {
    return this.addressService.editState(id, state);
  }

  @Delete('states/:id')
  @Public()
  deleteState(@Param('id') id: string) {
    return this.addressService.deleteState(id);
  }

  @Get('cities')
  @Public()
  getCities() {
    return this.addressService.getCities();
  }

  @Post('cities')
  @Public()
  createCity(@Body() body: CPCityDto) {
    return this.addressService.createCity(body);
  }

  @Get('cities/:id')
  @Public()
  getCity(@Param('id') id: string) {
    return this.addressService.getCity(id);
  }

  @Patch('cities/:id')
  @Public()
  editCity(@Param('id') id: string, @Body() state: CPCityDto) {
    return this.addressService.editCity(id, state);
  }

  @Delete('cities/:id')
  @Public()
  deleteCity(@Param('id') id: string) {
    return this.addressService.deleteCity(id);
  }
}
