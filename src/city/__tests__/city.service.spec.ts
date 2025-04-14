import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CacheService } from '../../cache/cache.service';
import { Repository } from 'typeorm';
import { CityService } from '../city.service';
import { cityEntity } from '../entities/city.entity';
import { cityMock } from '../__mocks__/city.mock';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<cityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([cityMock]),
          },
        },
        {
          provide: getRepositoryToken(cityEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cityMock),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<cityEntity>>(
      getRepositoryToken(cityEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should return findOne City', async () => {
    const city = await service.findCityById(cityMock.id);

    expect(city).toEqual(cityMock);
  });

  it('should return error findOne not found', async () => {
    jest.spyOn(cityRepository, 'findOne').mockResolvedValue(null); 

    await expect(service.findCityById(cityMock.id)).rejects.toThrowError(); 
  });

  it('should return Cities in getAllCitiesByStateId', async () => {
    const city = await service.getAllCitiesByStateId(cityMock.id);

    expect(city).toEqual([cityMock]);
  });
});