import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './infrastructure/typeorm/typeorm.config';
import { ServiceAreaModule } from './service-area/service-area.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // reads .env
    TypeOrmModule.forRootAsync({
      useFactory: () => typeOrmConfig, // uses env-based config
    }),
    ServiceAreaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
