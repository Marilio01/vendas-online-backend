import { InjectRepository } from '@nestjs/typeorm';
import { cityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { CacheService } from '../cache/cache.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(cityEntity)
    private readonly cityRepository: Repository<cityEntity>,

    private readonly cacheService: CacheService,
  ) {}

  async getAllCitiesByStateId(stateId: number): Promise<cityEntity[]> {
    const cachedCities = await this.cacheService.getCache<cityEntity[]>(
      `state_${stateId}`,
      () =>
        this.cityRepository.find({
          where: {
            stateId,
          },
        }),
    );

    if (cachedCities === null) {
      return [];
    }

    return cachedCities;
  }
  async findCityById(cityId: number): Promise<cityEntity> {
    const city = await this.cityRepository.findOne({
      where: {
        id: cityId,
      },
    });

    if (!city) {
      throw new NotFoundException(`CityId: ${cityId} Not Found.`);
    }
    return city;
  }

  async findCityByName(
    nameCity: string,
    nameState: string,
  ): Promise<cityEntity> {
    const city = await this.cityRepository.findOne({
      where: {
        name: nameCity,
        state: {
          uf: nameState,
        },
      },
      relations: {
        state: true,
      },
    });

    if (!city) {
      throw new NotFoundException(`City not found.`);
    }

    return city;
  }
}
