import { Module  } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { cityEntity } from './entities/city.entity';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports:[CacheModule,
  TypeOrmModule.forFeature([cityEntity])],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
