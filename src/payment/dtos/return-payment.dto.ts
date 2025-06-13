import { ReturnPaymentStatus } from '../../payment-status/dtos/return-payment-status.dto';
import { PaymentCreditCardEntity } from '../entities/payment_credit-card.entity';
import { PaymentEntity } from '../entities/payment.entity';

export class ReturnPaymentDTO {
  id: number;
  statusId: number;
  price: number;
  discount: number;
  finalPrice: number;
  type: string;
  paymentStatus?: ReturnPaymentStatus;

  amountPayments?: number;

  constructor(payment: PaymentEntity) {
    this.id = payment.id;
    this.statusId = payment.statusId;
    this.price = payment.price;
    this.discount = payment.discount;
    this.finalPrice = payment.finalPrice;
    this.type = payment.type;

    if (payment.type === 'PaymentCreditCardEntity') {
      this.amountPayments = (payment as PaymentCreditCardEntity).amountPayments;
    }

    this.paymentStatus = payment.paymentStatus
      ? new ReturnPaymentStatus(payment.paymentStatus)
      : undefined;
  }
}