import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { ServiceAreaEntity } from '../../service-area/infrastructure/typeorm/entities/service-area.entity';

// Load env variables
config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [ServiceAreaEntity],
  synchronize: false,
  logging: false,
});

async function seed() {
  await AppDataSource.initialize();

  // Only seed in development
  if (process.env.NODE_ENV !== 'development') {
    console.log('❌ Not in development mode, skipping seed.');
    return;
  }

  // Example: Add a mock service area (Polygon around Jeddah)
  const wkt =
    'POLYGON((39.7 21.4, 39.9 21.4, 39.9 21.7, 39.7 21.7, 39.7 21.4))';
  await AppDataSource.createQueryRunner().query(
    `INSERT INTO service_areas (id, name, polygon, active)
       VALUES (gen_random_uuid(), $1, ST_GeomFromText($2, 4326), true)
       ON CONFLICT (name) DO NOTHING`,
    ['Jeddah Downtown', wkt],
  );

  console.log('✅ Seeded service areas!');
  await AppDataSource.destroy();
}

seed();
