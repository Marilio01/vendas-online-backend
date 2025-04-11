import { ReturnStateDto } from "src/state/dtos/returnState.dto";
import { cityEntity } from "../entities/city.entity";


export class ReturnCityDto{
    name: string;
    state?: ReturnStateDto;

    constructor(city: cityEntity){
        this.name = city.name;
        this.state = city.state ? new ReturnStateDto(city.state) : undefined;
    }
}