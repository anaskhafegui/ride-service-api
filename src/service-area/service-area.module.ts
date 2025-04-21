import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceAreaEntity } from './infrastructure/typeorm/entities/service-area.entity';
import { TypeOrmServiceAreaRepository } from './infrastructure/typeorm/repositories/typeorm-service-area.repository';
import { ServiceAreaService } from './application/queries/service-area.service';
import { ServiceAreaController } from './infrastructure/controller/service-area.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceAreaEntity])],
  controllers: [ServiceAreaController],
  providers: [
    ServiceAreaService,
    {
      provide: 'ServiceAreaRepository',
      useClass: TypeOrmServiceAreaRepository,
    },
  ],
  exports: ['ServiceAreaRepository'],
})
export class ServiceAreaModule {}
