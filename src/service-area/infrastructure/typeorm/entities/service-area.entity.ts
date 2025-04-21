import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('service_areas')
@Index('service_area_polygon_gix', ['polygon'], { spatial: true }) // Spatial index
@Index('service_area_name_unique', ['name'], { unique: true }) // Unique index for ON CONFLICT
export class ServiceAreaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'geometry', spatialFeatureType: 'Polygon', srid: 4326 })
  polygon: string;

  @Column({ default: true })
  active: boolean;
}
