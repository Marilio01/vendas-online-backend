import { ReturnUserDto } from '../../user/dtos/returnUser.dto';
 import { OrderEntity } from '../entities/order.entity';
 import { ReturnOrderProductDTO } from '../../order-product/dtos/return-order-product.dto';
 import { ReturnAddressDto } from '../../address/dtos/returnAddress.dto';
 import { ReturnPaymentDTO } from '../../payment/dtos/return-payment.dto';
 
 export class ReturnOrderDTO {
   id: number;
   date: string;
   userId: number;
   addressId: number;
   paymentId: number;
   user?: ReturnUserDto;
   address?: ReturnAddressDto;
   payment?: ReturnPaymentDTO;
   ordersProduct?: ReturnOrderProductDTO[];
   amountProducts?: number;
 
   constructor(order?: OrderEntity) {
    this.id = order?.id ?? 0;
    this.date = order?.date.toString() ?? '';
    this.userId = order?.userId ?? 0;
    this.addressId = order?.addressId ?? 0;
    this.paymentId = order?.paymentId ?? 0;
    this.user = order?.user ? new ReturnUserDto(order?.user) : undefined;
    this.address = order?.address
      ? new ReturnAddressDto(order?.address)
     : undefined;
     this.payment = order?.payment
     ? new ReturnPaymentDTO(order?.payment)
     : undefined;
     this.ordersProduct = order?.ordersProduct
     ? order?.ordersProduct.map(
         (orderProduct) => new ReturnOrderProductDTO(orderProduct),
       )
     : undefined;
     this.amountProducts = order?.amountProducts;
   }
 }