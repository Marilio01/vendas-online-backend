import { stateMock } from '../../state/__mocks__/state.mock';
 import { cityEntity } from '../entities/city.entity';
 
 export const cityMock: cityEntity= {
   createdAt: new Date(),
   id: 6543543,
   name: 'cityName',
   stateId: stateMock.id,
   updatedAt: new Date(),
 };