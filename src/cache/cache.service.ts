import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCache<T>(key: string, functionRequest: () => Promise<T>): Promise<T | null> { // Alteração aqui
    const allData: T | null = await this.cacheManager.get<T>(key); // Alteração aqui

    if (allData) {
      return allData;
    }

    const cities: T = await functionRequest();
    await this.cacheManager.set(key, cities);
    return cities;
  }
}
    
           