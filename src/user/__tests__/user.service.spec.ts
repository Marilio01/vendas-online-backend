import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../user.service';
import { userEntityMock } from '../__mocks__/user.mock';
import { createUserMock } from '../__mocks__/createUser.mock';
import { UserType } from '../enum/user-type.enum';
import {
  updatePasswordInvalidMock,
  updatePasswordMock,
} from '../__mocks__/update-user.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user in findUserByEmail', async () => {
    const user = await service.findUserByEmail(userEntityMock.email);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error in findUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null); 

    await expect(
      service.findUserByEmail(userEntityMock.email),
    ).rejects.toThrowError(); 
  });


  it('should return error in findUserByEmail (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    await expect(
      service.findUserByEmail(userEntityMock.email),
    ).rejects.toThrowError(); 
  });

  it('should return user in findUserById', async () => {
    const user = await service.findUserById(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error in findUserById', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null); 

    await expect(service.findUserById(userEntityMock.id)).rejects.toThrowError(); 
  });

  it('should return error in findUserById (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    await expect(service.findUserById(userEntityMock.id)).rejects.toThrowError();
  });

  it('should return user in getUserByIdUsingRelations', async () => {
    const user = await service.getUserByIdUsingRelations(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error if user exist', async () => {
    await expect(service.createUser(createUserMock)).rejects.toThrowError(); 
  });

  it('should return user if user not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null); 
    const spy = jest.spyOn(userRepository, 'save');

    const user = await service.createUser(createUserMock);

    expect(user).toEqual(userEntityMock);
    expect(spy.mock.calls[0][0].typeUser).toEqual(UserType.User);
  });

  it('should return user if user not exist and user Admin', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null); 
    const spySave = jest.spyOn(userRepository, 'save').mockResolvedValue({ ...userEntityMock, typeUser: UserType.Admin});

    const createdUser = await service.createUser(createUserMock, UserType.Admin); 

    expect(createdUser.typeUser).toEqual(UserType.Admin); 
    expect(spySave).toHaveBeenCalled(); 
  });

  it('should return user in update password', async () => {
    const user = await service.updatePasswordUser(
      updatePasswordMock,
      userEntityMock.id,
    );

    expect(user).toEqual(userEntityMock);
  });

  it('should return invalid password in error', async () => {
    expect(
      service.updatePasswordUser(updatePasswordInvalidMock, userEntityMock.id),
    ).rejects.toThrowError();
  });

  it('should return error in user not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null); 

    await expect(
      service.updatePasswordUser(updatePasswordMock, userEntityMock.id),
    ).rejects.toThrowError(); 
});

});