import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async createAddress(
    createAddressDto: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    await this.userService.findUserById(userId);
    await this.cityService.findCityById(createAddressDto.cityId);

    return this.addressRepository.save({
      ...createAddressDto,
      userId,
    });
  }

  async findAddressByUserId(userId: number): Promise<AddressEntity[]> {
    const addresses = await this.addressRepository.find({
      where: { userId },
      relations: { city: { state: true } },
    });

    if (!addresses || addresses.length === 0) {
      throw new NotFoundException(`Nenhum endereço encontrado para este usuário.`);
    }

    return addresses;
  }

  async deleteAddress(addressId: number): Promise<void> {
    const address = await this.addressRepository.findOneBy({ id: addressId });

    if (!address) {
      throw new NotFoundException(`Endereço com ID ${addressId} não foi encontrado.`);
    }

    try {
      await this.addressRepository.delete(addressId);
    } catch (error) {
      const dbError = error as { code?: string; detail?: string };

      if (dbError.code === '23503') {
        throw new ConflictException(
          'Este endereço está vinculado a um pedido e não pode ser removido.',
        );
      }

      throw error;
    }
  }
}
