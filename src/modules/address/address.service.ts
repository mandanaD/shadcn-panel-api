import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from './entity/state.entity';
import { Repository } from 'typeorm';
import { City } from './entity/city.entity';
import { Users } from '../users/users.entity';
import { CpStateDto } from './dtos/cp-state.dto';
import { CPCityDto } from './dtos/cp-city.dto';
import { applyQueryOptions } from '../../common/query/utils/applyQueryOptions';
import { QueryDto } from '../../dto/query.dto';

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

  getStates(queryDto: QueryDto) {
    const { page, limit, search, ordering } = queryDto;
    const query = this.stateRepository.createQueryBuilder();
    return applyQueryOptions<State>(query, {
      search,
      searchFields: ['label'],
      ordering,
      orderFields: ['label', 'created_at'],
      limit,
      page,
    });
  }

  createState(body: CpStateDto) {
    const state = this.stateRepository.create(body);
    return this.stateRepository.save(state);
  }

  async getState(id: string) {
    const state = await this.stateRepository.findOne({
      where: { id },
    });

    if (!state) {
      throw new NotFoundException('State not found');
    }

    return state;
  }

  async editState(id: string, body: CpStateDto) {
    const state = await this.getState(id);
    if (state) {
      return this.stateRepository.save({
        ...state,
        ...body,
      });
    }
  }

  async deleteState(id: string) {
    const state = await this.stateRepository.findOne({ where: { id } });

    if (!state) {
      throw new NotFoundException('State not found');
    }

    await this.stateRepository.remove(state);

    return null;
  }

  getCities(queryDto: QueryDto) {
    const { page, limit, search, ordering } = queryDto;
    const query = this.cityRepository.createQueryBuilder();
    return applyQueryOptions<City>(query, {
      search,
      searchFields: ['label'],
      ordering,
      orderFields: ['label', 'created_at'],
      limit,
      page,
    });
  }

  async createCity(body: CPCityDto) {
    const state = await this.getState(body.state);

    if (state) {
      const finalBody = {
        ...body,
        state,
      };
      const city = this.cityRepository.create(finalBody);
      return this.cityRepository.save(city);
    }
  }

  async getCity(id: string) {
    const state = await this.cityRepository.findOne({
      where: { id },
    });

    if (!state) {
      throw new NotFoundException('City not found');
    }

    return state;
  }

  async editCity(id: string, body: CPCityDto) {
    const city = await this.getCity(id);
    const state = await this.getState(body.state);

    if (city && state) {
      return this.cityRepository.save({
        ...city,
        state,
      });
    }
  }

  async deleteCity(id: string) {
    const city = await this.cityRepository.findOne({ where: { id } });

    if (!city) {
      throw new NotFoundException('City not found');
    }

    await this.cityRepository.remove(city);

    return null;
  }
}
