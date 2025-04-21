import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceAreaEntity } from '../entities/service-area.entity';

import { IServiceAreaRepository } from '../../../domain/contracts/service-area.repository.interface';

@Injectable()
export class TypeOrmServiceAreaRepository implements IServiceAreaRepository {
  constructor(
    @InjectRepository(ServiceAreaEntity)
    private readonly repo: Repository<ServiceAreaEntity>,
  ) {}

  async findServiceAreaContaining(
    lat: number,
    lng: number,
  ): Promise<ServiceAreaEntity | null> {
    return this.repo
      .createQueryBuilder('service_area')
      .where(
        `
        ST_Contains(
          service_area.polygon,
          ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)
        )
      `,
        { lat, lng },
      )
      .getOne();
  }
}
