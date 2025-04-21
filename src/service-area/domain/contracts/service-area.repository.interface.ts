import { ServiceAreaEntity } from '../../infrastructure/typeorm/entities/service-area.entity';

export interface IServiceAreaRepository {
  findServiceAreaContaining(
    lat: number,
    lng: number,
  ): Promise<ServiceAreaEntity | null>;
}
