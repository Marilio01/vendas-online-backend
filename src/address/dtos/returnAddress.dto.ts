import { addressEntity } from "../entities/address.entity";

export class ReturnAddressDto{
    complement: string;
    numberAddress: number;
    cep: string;

    constructor(address: addressEntity){
        this.complement = address.complement;
        this.numberAddress = address.numberAddress;
        this.cep = address.cep;
    }
}