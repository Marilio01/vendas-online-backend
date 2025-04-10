import { CACHE_MANAGER , Cache} from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';


@Injectable()
export class CacheService {
     constructor(
            @Inject(CACHE_MANAGER) private cacheManager: Cache,
        ) {}
    
        async getCache<T>(key: string,
            functionRequest: ()=> Promise<T>,
        ): Promise<T> {
            const allDate :Awaited<T> | null  = await this.cacheManager.get(key);

            if (allDate !== null){
                return allDate;
            }
            const cities: T = await functionRequest();

            await this.cacheManager.set(key,cities);

            return cities;
        }
}
    
           