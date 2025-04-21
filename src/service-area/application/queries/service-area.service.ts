import { BadRequestException, Injectable } from '@nestjs/common';
import { IServiceAreaRepository } from '../../domain/contracts/service-area.repository.interface';
import { ServiceAreaEntity } from '../../infrastructure/typeorm/entities/service-area.entity';

@Injectable()
export class ServiceAreaService {
  constructor(private readonly repo: IServiceAreaRepository) {}

  async findByCoordinates(
    lat: number,
    lng: number,
  ): Promise<ServiceAreaEntity> {
    const area = await this.repo.findServiceAreaContaining(lat, lng);
    if (!area) {
      throw new BadRequestException('Pickup location is outside service areas');
    }
    return area;
  }
}
