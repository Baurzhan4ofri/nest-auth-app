import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { AuthModule } from "../auth/auth.module";
import { AuthService } from "../auth/auth.service";
import { JwtStrategy } from "../auth/jwt.strategy";
import { LocalStrategy } from "../auth/local.strategy";
import { UserModule } from "./user.module";

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
