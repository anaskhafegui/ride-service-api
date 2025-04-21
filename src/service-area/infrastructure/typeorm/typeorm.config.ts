// service-area/infrastructure/typeorm/typeorm.config.ts
import { DataSource } from 'typeorm';
import { ServiceAreaEntity } from './entities/service-area.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'ride_app',
  entities: [ServiceAreaEntity],
  migrations: ['src/service-area/infrastructure/typeorm/migrations/*.ts'],
});
