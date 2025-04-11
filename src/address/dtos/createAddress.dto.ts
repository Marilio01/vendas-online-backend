import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAddressDto{
    @IsString()
    @IsOptional()
    complement: string;
    
    @IsNotEmpty()
    @IsInt()
    numberAddress: number;

    @IsString()
    cep: string;

    @IsInt()
    cityId: number;


}