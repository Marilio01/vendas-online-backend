import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enum/user-type.enum';
import { UpdatePasswordDTO } from './dtos/update-password.dto';
import { createPasswordHashed, validatePassword } from '../utils/password';

@Injectable()
export class UserService {
 constructor(
  @InjectRepository(UserEntity)
  private readonly UserRepository: Repository<UserEntity>,
 ){}

 async createUser(
  createUserDto: CreateUserDto,
  userType?: number,
): Promise<UserEntity> {
    const user = await this.findUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) {
      throw new BadGatewayException('email registered in system');
    }

    const passwordHashed = await createPasswordHashed(createUserDto.password);

    return this.UserRepository.save({
      ...createUserDto,
      typeUser: userType ? userType : UserType.User,
      password: passwordHashed,
    });

  }

  async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
    const user = await this.UserRepository.findOne({
        where: { id: userId },
        relations:{
          addresses :{
            city:{
              state:true,
            }
          }
        }
    });
    if (!user) {
        throw new NotFoundException(`Usuário com ID ${userId} não encontrado.`);
    }
    return user;


  }


  async getAllUser(): Promise<UserEntity[]>{
    return this.UserRepository.find();
  }

   async findUserById(userId: number): Promise<UserEntity>{
    const user = await this.UserRepository.findOne({
      where:{
        id:userId,

      },
    });

    if(!user){
      throw new NotFoundException(`UserId: ${userId}Not Found`);
    }

    return user;
   }

   async findUserByEmail(email: string): Promise<UserEntity>{
    const user = await this.UserRepository.findOne({
      where:{
        email,

      },
    });

    if(!user){
      throw new NotFoundException(`Email: ${email}Not Found`);
    }

    return user;
   }

   async updatePasswordUser(
    updatePasswordDTO: UpdatePasswordDTO,
    userId: number,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);

    const passwordHashed = await createPasswordHashed(
      updatePasswordDTO.newPassword,
    );

    const isMatch = await validatePassword(
      updatePasswordDTO.lastPassword,
      user.password || '',
    );

    if (!isMatch) {
      throw new BadRequestException('Last password invalid');
    }

    return this.UserRepository.save({
      ...user,
      password: passwordHashed,
    });
  }
}


