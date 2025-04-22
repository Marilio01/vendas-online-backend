import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PaymentModule } from '../payment/payment.module';

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity]), PaymentModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
