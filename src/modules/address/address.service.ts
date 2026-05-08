import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from './entity/state.entity';
import { Repository } from 'typeorm';
import { City } from './entity/city.entity';
import { Users } from '../users/users.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(State) private stateRepository: Repository<State>,
    @InjectRepository(City) private cityRepository: Repository<City>,
  ) {}

  async checkAddress(body: Partial<Users>) {
    const updateData: Partial<Users> = {
      ...body,
    };
    if (updateData?.city_id) {
      const city = await this.cityRepository.findOne({
        where: { id: updateData.city_id },
        relations: ['state'],
      });
      if (city) {
        updateData.city = city;
        updateData.state = city.state;
      } else throw new NotFoundException('City not found');
    } else if (updateData?.state_id) {
      const state = await this.stateRepository.findOne({
        where: { id: updateData.state_id },
      });
      if (state) {
        updateData.state = state;
        updateData.city = null;
      } else throw new NotFoundException('State not found');
    }

    return updateData;
  }

  getStates() {
    return this.stateRepository.find();
  }

  getCities() {
    return this.cityRepository.find();
  }
}
