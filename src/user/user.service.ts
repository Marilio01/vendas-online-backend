import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/ceateUser.dto';
import { hash } from 'bcrypt';
import { UserEntity } from './interfaces/user.entity';
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
      password: passwordHashed,
    });

  }


  async getAllUser(): Promise<UserEntity[]>{
    return this.UserRepository.find();
  }
}
