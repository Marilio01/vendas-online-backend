import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { cityEntity } from './entities/city.entity';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('/:stateId')
  async getAllCitiesByStateId(
    @Param('stateId') stateId: number,
  ): Promise<cityEntity[]> {
    return this.cityService.getAllCitiesByStateId(stateId);
  }
}
