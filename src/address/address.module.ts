import { Module } from '@nestjs/common';
 import { TypeOrmModule } from '@nestjs/typeorm';
 import { AddressController } from './address.controller';
 import { AddressService } from './address.service';
 import { AddressEntity } from './entities/address.entity';
 import { CityModule } from 'src/city/city.module';
 import { UserModule } from 'src/user/user.module';
 
 @Module({
   imports: [TypeOrmModule.forFeature([AddressEntity]), UserModule, CityModule],
   controllers: [AddressController],
   providers: [AddressService],
 })

 export class AddressModule {}