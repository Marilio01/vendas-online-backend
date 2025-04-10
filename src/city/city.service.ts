
import { InjectRepository } from '@nestjs/typeorm';
import { cityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { CacheService } from 'src/cache/cache.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(cityEntity)
    private readonly cityRepository: Repository<cityEntity>,

    private readonly cacheService: CacheService,
  ) {}

  async getAllCitiesByStateId(stateId: number): Promise<cityEntity[]> {
    return this.cacheService.getCache<cityEntity[]>(`state_${stateId}`, () =>
      this.cityRepository.find({
        where: {
          stateId,
        },
      }),
    );
  }
}
