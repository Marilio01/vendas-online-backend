import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { hash } from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enum/user-type.enum';

@Injectable()
export class UserService {
 constructor(
  @InjectRepository(UserEntity)
  private readonly UserRepository: Repository<UserEntity>,
 ){}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.findUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) {
      throw new BadGatewayException('email registered in system');
    }

    
    const salt0rRounds = 10;

    const passwordHashed = await hash(createUserDto.password, salt0rRounds);

    return this.UserRepository.save({
      ...createUserDto,
      typeUser: UserType.User,
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
}


