import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { hash } from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
 constructor(
  @InjectRepository(UserEntity)
  private readonly UserRepository: Repository<UserEntity>,
 ){}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const salt0rRounds = 10;

    const passwordHashed = await hash(createUserDto.password, salt0rRounds);

    return this.UserRepository.save({
      ...createUserDto,
      typeUser: 1,
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
}
