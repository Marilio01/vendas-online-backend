import { stateEntity } from "../entities/state.entity";

export class ReturnStateDto {
    name: string;
    uf: string;

    constructor(state: stateEntity){
        this.name = state.name;
        this.uf = state.uf;
    }
}