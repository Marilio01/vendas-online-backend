import { UpdatePasswordDTO } from '../dtos/update-password.dto';
 
 export const updatePasswordMock: UpdatePasswordDTO = {
   lastPassword: '123456',
   newPassword: 'fdsafj',
 };
 
 export const updatePasswordInvalidMock: UpdatePasswordDTO = {
   lastPassword: 'lkfdjsa',
   newPassword: 'flkjbla',
 };