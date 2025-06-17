import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
 
 export class CreateAddressDto {
   @IsString()
   @IsOptional()
   complement: string;
 
   @IsInt()
   numberAddress: number;
 
   @IsString()
   cep: string;
 
   @IsInt()
   cityId: number;

   @IsString()
   @IsNotEmpty()
   street: string;

   @IsString()
   @IsNotEmpty()
   neighborhood: string;
 }