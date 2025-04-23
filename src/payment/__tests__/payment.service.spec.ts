import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from '../payment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
 import { Repository } from 'typeorm';
 import { PaymentEntity } from '../entities/payment.entity';


describe('PaymentService', () => {
  let service: PaymentService;
  let paymentRepository: Repository<PaymentEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(PaymentEntity),
          useValue: {
            save: jest.fn(),
          },
        },
        PaymentService,
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    paymentRepository = module.get<Repository<PaymentEntity>>(
      getRepositoryToken(PaymentEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(paymentRepository).toBeDefined();
  });
});
