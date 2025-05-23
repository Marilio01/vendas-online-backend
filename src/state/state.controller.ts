import { Controller, Get } from '@nestjs/common';
import { StateService } from './state.service';
import { stateEntity } from './entities/state.entity';

@Controller('state')
export class StateController {

    constructor(private readonly stateServices : StateService){}

    @Get()
    async getAllState(): Promise<stateEntity[]>{
        return this.stateServices.getAllState();
    }
       
    
}

