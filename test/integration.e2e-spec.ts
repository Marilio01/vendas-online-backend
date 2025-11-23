import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from '../src/user/dtos/createUser.dto';
import { LoginDto } from '../src/auth/dtos/login.dto';

describe('Fluxo de Integração do Usuário (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  const mockUser: CreateUserDto = {
    name: 'Usuario Teste Integração',
    email: `teste.integ.${Date.now()}@email.com`,
    cpf: `${Date.now()}`.substring(0, 11),
    phone: '11988887777',
    password: 'senhaSegura123',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/user (POST) - Deve criar um novo usuário com sucesso', async () => {
    return request(app.getHttpServer())
      .post('/user')
      .send(mockUser)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toEqual(mockUser.name);
        expect(res.body.email).toEqual(mockUser.email);
        expect(res.body).not.toHaveProperty('password');
      });
  });

  it('/auth (POST) - Deve realizar login e retornar o token de acesso', async () => {
    const loginPayload: LoginDto = {
      email: mockUser.email,
      password: mockUser.password,
    };

    return request(app.getHttpServer())
      .post('/auth')
      .send(loginPayload)
      .expect(201)
      .expect((res) => {
        accessToken = res.body.accessToken;

        expect(accessToken).toBeDefined();
        expect(res.body.user).toBeDefined();
        expect(res.body.user.email).toEqual(mockUser.email);
      });
  });

  it('/product (GET) - Deve acessar a listagem de produtos usando o token', async () => {
    return request(app.getHttpServer())
      .get('/product')
      .set('Authorization', accessToken)
      .then((res) => {
        expect([200, 404]).toContain(res.status);
      });
  });
});
