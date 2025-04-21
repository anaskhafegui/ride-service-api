import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ServiceAreaEntity } from '../../service-area/infrastructure/typeorm/entities/service-area.entity';

// import other module entities here...

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'ride_app',
  entities: [
    ServiceAreaEntity,
    // Add more entities here
  ],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  autoLoadEntities: true,
};
