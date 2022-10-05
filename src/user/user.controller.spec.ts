import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from "./user.service";
import { INestApplication } from "@nestjs/common";
import { UserModule } from "./user.module";
import * as request from 'supertest';


describe('UserController', () => {
  let app: INestApplication;
  let userService = {} ;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    app = moduleRef.createNestApplication()
    await app.init();
  });

  it(`/GET user`, () => {
    return request('http://localhost:3000')
      .get('/user/all')
      .expect(200)
  });

  it('/POST register', () => {
    return request('http://localhost:3000')
      .post('/user/register')
      .send({
        "email": "12@mail.ru",
        "username": "1",
        "password": "1213"
      })
      .expect(200)

  })

  it('/POST register duplicate', () => {
    return request('http://localhost:3000')
      .post('/user/register')
      .send({
        "email": "12@mail.ru",
        "username": "1",
        "password": "1213"
      })
      .expect(400)
  })

  afterAll(async () => {
    await app.close();
  });
});
