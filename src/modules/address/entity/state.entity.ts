import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../entity/base.entity';
import { City } from './city.entity';

@Entity()
export class State extends BaseEntity {
  @Column()
  label: string;

  @OneToMany(() => City, (city: City) => city.state, {
    onDelete: 'CASCADE',
  })
  cities: City[];
}
