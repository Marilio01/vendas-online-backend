import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { stateEntity } from './entities/state.entity';



@Injectable()
export class StateService {
 constructor(
  @InjectRepository(stateEntity)
  private readonly stateRepository: Repository<stateEntity>,
 ){}
    async getAllState(): Promise<stateEntity[]>{
        return this.stateRepository.find();
    }
}
