import { InsertCartDTO } from '../../cart/dtos/insert-cart.dto';
import { productMock } from '../../product/__mocks__/product.mock';

 
 export const insertCartMock: InsertCartDTO = {
   amount: 535,
   productId: productMock.id,
 };