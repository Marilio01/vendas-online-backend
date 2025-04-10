import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(cityEntity)
        private readonly cityRepository: Repository<cityEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async getAllCitiesByStateId(stateId: number): Promise<cityEntity[]> {
        const citiesCache: cityEntity[] | null = await this.cacheManager.get<cityEntity[]>(`stateId_${stateId}`);

        if (citiesCache) {
            return citiesCache;
        }

        const cities = await this.cityRepository.find({
            where: {
                stateId,
            },
        });

        await this.cacheManager.set(`stateId_${stateId}`, cities);

        return cities;
    }
}
