import { UserEntity } from '../entities/user.entity';
 import { UserType } from '../enum/user-type.enum';
 
 export const userEntityMock: UserEntity = {
   cpf: '123543543',
   createdAt: new Date(),
   email: 'emailmock@emali.com',
   id: 43242,
   name: 'Marilio',
   password: 'largePassword',
   phone: '321532523532',
   typeUser: UserType.User,
   updatedAt: new Date(),
 };