import { ReturnAddressDto } from 'src/address/dtos/returnAddress.dto';
import { UserEntity } from '../entities/user.entity';

export class ReturnUserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  addresses?: ReturnAddressDto[];

  constructor(UserEntity: UserEntity) {
    this.id = UserEntity.id;
    this.name = UserEntity.name;
    this.email = UserEntity.email;
    this.phone = UserEntity.phone;
    this.cpf = UserEntity.cpf;

    this.addresses = UserEntity.addresses
      ? UserEntity.addresses.map((address) => new ReturnAddressDto(address))
      : undefined;
  }
}
