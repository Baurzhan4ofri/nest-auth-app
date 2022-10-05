import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { LocalStrategy } from "./local.strategy";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { AuthModule } from "./auth.module";
import * as request from "supertest";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it(`/GET profile`, () => {
    return request('http://localhost:3000')
      .get('/user/profile')
      .set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEiLCJlbWFpbCI6IjVAbWFpbC5ydSIsImlhdCI6MTY2NDk2ODI2OCwiZXhwIjoxNjY0OTY4MzI4fQ.tyzv1eOSRxZL377okgleZpZMClCWkGuQ6iF5uZYNCnI')
      .expect(200)
  });
});
