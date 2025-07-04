import { ReturnCityDto } from '../../city/dtos/returnCity.dto';
import { AddressEntity } from '../entities/address.entity';

export class ReturnAddressDto {
  id: number;
  complement: string;
  numberAddress: number;
  cep: string;
  street: string; 
  neighborhood: string; 
  city?: ReturnCityDto;

  constructor(address: AddressEntity) {
    this.id = address.id;
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
    this.street = address.street;      
    this.neighborhood = address.neighborhood;
    this.city = address.city ? new ReturnCityDto(address.city) : undefined;
  }
}
